import { mock } from "jest-mock-extended";

import IUser from "../../../src/interfaces/IUser";

import User from "../../../src/database/models/userModel";

import AuthenticateUserService from "../../../src/services/AuthenticateUserService";

import IAuthenticateUserService from "../../../src/interfaces/IAuthenticateUserService";

import BadRequestError from "../../../src/errors/BadRequestError";

import UnathorizedError from "../../../src/errors/UnathorizedError";

import jwt from "jsonwebtoken";

import IJwt from "../../../src/interfaces/IJson";

import bcrypt from "bcryptjs";

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

      mockRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(userData.email, userData.password);
      }).rejects.toThrow(new BadRequestError("Usuario não registrado!"));
    });

    it("should return exception if password isnt matching", async () => {
      const { sut, mockRepository } = makeSut();

      const userData = {
        email: "useremail@mail.com",
        password: "123123123",
      };

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        password: "789789789",
      } as IUser);

      expect(async () => {
        await sut.execute(userData.email, userData.password);
      }).rejects.toThrow(new UnathorizedError("Falha na autenticação!"));
    });

    it("should return a token if user is registered", async () => {
      const { sut, mockRepository } = makeSut();

      // const userData = {
      //   email: "useremail@mail.com",
      //   password: "123123123",
      // };

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        email: "useremail@mail.com",
        password: bcrypt.hashSync("123123123"),
        admin: true,
      } as IUser);

      const token = await sut.execute("useremail@mail.com", "123123123");

      const compareToken = jwt.verify(
        token,
        process.env.JWT_TOKEN_SECRET as string
      ) as IJwt;

      expect(compareToken.admin).toBe(true);
    });
  });
});
