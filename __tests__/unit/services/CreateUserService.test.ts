import { mock } from "jest-mock-extended";

import IUser from "../../../src/interfaces/IUser";

import { ModelStatic } from "sequelize";

import CreateUserService from "../../../src/services/CreateUserService";

import ICreateUserService from "../../../src/interfaces/ICreateUserService";

import BadRequestError from "../../../src/errors/BadRequestError";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IUser>>();

  const sut: ICreateUserService = new CreateUserService(mockRepository);

  return { sut, mockRepository };
};

describe("create user service", () => {
  describe("when execute is called", () => {
    it("should throw an error if user already exists", async () => {
      const { sut, mockRepository } = makeSut();

      const userInputData = {
        email: "user@email.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
      };

      mockRepository.findOne.mockResolvedValue({ id: "1" } as IUser);

      expect(async () => {
        await sut.execute(userInputData);
      }).rejects.toThrow(new BadRequestError("Usuario já cadastrado!"));
    });

    it("should create a new user", async () => {
      const { sut, mockRepository } = makeSut();

      const userInputData = {
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
      };

      mockRepository.findOne.mockResolvedValue(null);

      mockRepository.create.mockResolvedValue({
        id: "1",
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
      } as IUser);

      const user = await sut.execute(userInputData);

      expect(user).toHaveProperty("id");
    });
  });
});
