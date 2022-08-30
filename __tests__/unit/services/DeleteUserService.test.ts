import { mock } from "jest-mock-extended";

import IUser from "../../../src/interfaces/IUser";

import User from "../../../src/database/models/userModel";

import DeleteUserService from "../../../src/services/DeleteUserService";

import IDeleteUserService from "../../../src/services/DeleteUserService";

import InternalError from "../../../src/errors/InternalError";

const makeSut = () => {
  const mockRepository = mock<typeof User>();

  const sut: IDeleteUserService = new DeleteUserService(mockRepository);

  return { mockRepository, sut };
};

describe("delete user service", () => {
  describe("when execute is called", () => {
    it("should return exception if failed to delete user", async () => {});
  });
});
