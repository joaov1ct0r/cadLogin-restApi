import { mock } from "jest-mock-extended";

// import IUser from "../../../src/interfaces/IUser";

import User from "../../../src/database/models/userModel";

import AuthenticateUserService from "../../../src/services/AuthenticateUserService";

import IAuthenticateUserService from "../../../src/interfaces/IAuthenticateUserService";

import BadRequestError from "../../../src/errors/BadRequestError";

const makeSut = () => {
  const mockRepository = mock<typeof User>();

  const sut: IAuthenticateUserService = new AuthenticateUserService(
    mockRepository
  );

  return { sut, mockRepository };
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

      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
