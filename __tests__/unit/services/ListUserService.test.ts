import { mock } from "jest-mock-extended";

import { ModelStatic } from "sequelize";

import IUser from "../../../src/interfaces/IUser";

import IListUserService from "../../../src/interfaces/IListUserService";

import ListUserService from "../../../src/services/ListUserService";

import BadRequestError from "../../../src/errors/BadRequestError";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IUser>>();

  const sut: IListUserService = new ListUserService(mockRepository);

  return { mockRepository, sut };
};

describe("list user service", () => {
  describe("when execute is called", () => {
    it("should return an exception if user is null", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("any@mail.com.br");
      }).rejects.toThrow(new BadRequestError("Usuario não encontrado!"));
    });

    it("should return a user is execute is succeed", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        email: "any@mail.com.br",
        password: "123123123",
        bornAt: "11/09/2001",
        admin: true,
      } as IUser);

      const user = await sut.execute("any@mail.com.br");

      expect(user).toHaveProperty("id");

      expect(user.email).toEqual("any@mail.com.br");
    });
  });
});
