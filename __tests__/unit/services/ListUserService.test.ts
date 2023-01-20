import { mock } from "jest-mock-extended";
import ListUserService from "../../../src/services/ListUserService";
import BadRequestError from "../../../src/errors/BadRequestError";
import IGetUserEmailRepository from "../../../src/interfaces/IGetUserEmailRepository";

const makeSut = () => {
  const getUserEmailRepository = mock<IGetUserEmailRepository>();

  const sut: ListUserService = new ListUserService(getUserEmailRepository);

  return { getUserEmailRepository, sut };
};

describe("list user service", () => {
  describe("when execute is called", () => {
    it("should return an exception if user is null", async () => {
      const { sut, getUserEmailRepository } = makeSut();

      getUserEmailRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("any@mail.com.br");
      }).rejects.toThrow(new BadRequestError("Usuario não encontrado!"));
    });

    it("should return a user if execute is succeed", async () => {
      const { sut, getUserEmailRepository } = makeSut();

      getUserEmailRepository.execute.mockResolvedValueOnce({
        id: 1,
        email: "any@mail.com.br",
        name: "user name",
        password: "123123123",
        bornAt: "01/09/2001",
        admin: false,
      });

      const user = await sut.execute("any@mail.com.br");

      expect(user).toHaveProperty("id");

      expect(user.email).toEqual("any@mail.com.br");
    });
  });
});
