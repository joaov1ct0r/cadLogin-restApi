import { jest } from "@jest/globals";

import { CalledWithMock, mock } from "jest-mock-extended";

import IUser from "../../src/interfaces/IUser";

import ICreateUserService from "../../src/interfaces/ICreateUserService";

import ICreateUserRequest from "../../src/interfaces/ICreateUserRequest";

import BadRequestError from "../../src/errors/BadRequestError";

describe("create user service", () => {
  let mockRepository: {
    execute: CalledWithMock<Promise<IUser>, [ICreateUserRequest]>;
  } & ICreateUserService;

  beforeEach(() => {
    mockRepository = mock<ICreateUserService>();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when execute is called", () => {
    it("should throw an error if user already exists", async () => {
      const userInputData = {
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "11/09/2001",
      };

      mockRepository.execute.mockRejectedValue(
        new BadRequestError("Usuario já cadastrado!")
      );

      expect(async () => {
        await mockRepository.execute(userInputData);
      }).rejects.toThrow(new BadRequestError("Usuario já cadastrado!"));

      expect(mockRepository.execute).toHaveBeenCalledTimes(1);
    });

    it("should create a new user", async () => {
      const userInputData = {
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "11/09/2001",
      };

      const id = {
        id: "1",
      };

      const returnedData = { ...userInputData, ...id };

      mockRepository.execute.mockReturnValue(
        returnedData as unknown as Promise<IUser>
      );

      expect(mockRepository.execute(userInputData)).toHaveProperty("id");

      expect(mockRepository.execute).toHaveBeenCalledTimes(1);
    });
  });
});
