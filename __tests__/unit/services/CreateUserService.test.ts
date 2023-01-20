import { mock } from "jest-mock-extended";
import CreateUserService from "../../../src/services/CreateUserService";
import BadRequestError from "../../../src/errors/BadRequestError";
import IGetUserEmailRepository from "../../../src/interfaces/IGetUserEmailRepository";
import ICreateUserRepository from "../../../src/interfaces/ICreateUserRepository";

const makeSut = () => {
  const getUserRepository = mock<IGetUserEmailRepository>();

  const createUserRepository = mock<ICreateUserRepository>();

  const sut: CreateUserService = new CreateUserService(
    getUserRepository,
    createUserRepository
  );

  return { sut, getUserRepository, createUserRepository };
};

describe("create user service", () => {
  describe("when execute is called", () => {
    it("should throw an error if user already exists", async () => {
      const { sut, getUserRepository } = makeSut();

      const userInputData = {
        email: "user@email.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
      };

      getUserRepository.execute.mockResolvedValue({
        id: 1,
        email: "user@email.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      });

      expect(async () => {
        await sut.execute(userInputData);
      }).rejects.toThrow(new BadRequestError("Usuario já cadastrado!"));
    });

    it("should create a new user", async () => {
      const { sut, getUserRepository, createUserRepository } = makeSut();

      const userInputData = {
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
      };

      getUserRepository.execute.mockResolvedValue(null);

      createUserRepository.execute.mockResolvedValue({
        id: 1,
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      });

      const user = await sut.execute(userInputData);

      expect(user).toHaveProperty("id");
    });
  });
});
