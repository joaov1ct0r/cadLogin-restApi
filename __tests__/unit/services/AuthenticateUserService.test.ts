import { mock } from "jest-mock-extended";

import IUser from "../../../src/interfaces/IUser";

import User from "../../../src/database/models/userModel";

import AuthenticateUserService from "../../../src/services/AuthenticateUserService";

import IAuthenticateUserService from "../../../src/interfaces/IAuthenticateUserService";

import BadRequestError from "../../../src/errors/BadRequestError";

import UnathorizedError from "../../../src/errors/UnathorizedError";

import bcrypt from "bcryptjs";

const makeSut = () => {
  const mockRepository = mock<typeof User>();

  const sut: IAuthenticateUserService = new AuthenticateUserService(
    mockRepository
  );

  const mockBcryptjs = mock<typeof bcrypt>();

  return { sut, mockRepository, mockBcryptjs };
};

describe("authenticate user service", () => {
  describe("when execute is called", () => {
    it("should return exception if user isnt registered", async () => {
      const { sut, mockRepository } = makeSut();

      const userData = {
        email: "useremail@mail.com",
        password: "123123123",
      };

      mockRepository.findOne.mockResolvedValue(null);

      expect(async () => {
        await sut.execute(userData.email, userData.password);
      }).rejects.toThrow(new BadRequestError("Usuario não registrado!"));
    });

    it("should return exception if password isnt matching", async () => {
      const { sut, mockRepository, mockBcryptjs } = makeSut();

      const userData = {
        email: "useremail@mail.com",
        password: "123123123",
      };

      mockRepository.findOne.mockResolvedValue({
        id: "1",
        password: userData.password,
      } as IUser);

      mockBcryptjs.compareSync.mockReturnValue(false);

      expect(async () => {
        await sut.execute(userData.email, userData.password);
      }).rejects.toThrow(new UnathorizedError("Falha na autenticação!"));
    });
  });
});
