// import { jest } from "@jest/globals";

import { mock } from "jest-mock-extended";

import IUser from "../../src/interfaces/IUser";

import User from "../../src/database/models/userModel";

import CreateUserService from "../../src/services/CreateUserService";

import ICreateUserService from "../../src/interfaces/ICreateUserService";

// import BadRequestError from "../../src/errors/BadRequestError";

describe("create user service", () => {
  describe("when execute is called", () => {
    // it("should throw an error if user already exists", async () => {
    //   const userInputData = {
    //     email: "user@email.com.br",
    //     password: "123123123",
    //     name: "user name",
    //     bornAt: "11/09/2001",
    //   };
    //   // await sut.execute(userInputData);
    //   expect(async () => {
    //     await sut.execute(userInputData);
    //   }).rejects.toThrow(new BadRequestError("Usuario já cadastrado!"));
    //   expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    // });

    it("should create a new user", async () => {
      const mockRepository = mock<typeof User>();

      const sut: ICreateUserService = new CreateUserService(mockRepository);

      const userInputData = {
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "11/09/2001",
      };

      mockRepository.findOne.mockResolvedValue(null);

      mockRepository.create.mockResolvedValue({
        id: "1",
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "11/09/2001",
      } as IUser);

      const user = await sut.execute(userInputData);

      expect(user).toHaveProperty("id");

      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);

      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });
  });
});
