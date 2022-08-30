import { mock } from "jest-mock-extended";

import User from "../../../src/database/models/userModel";

import DeleteUserService from "../../../src/services/DeleteUserService";

import IDeleteUserService from "../../../src/interfaces/IDeleteUserService";

import InternalError from "../../../src/errors/InternalError";

const makeSut = () => {
  const mockRepository = mock<typeof User>();

  const sut: IDeleteUserService = new DeleteUserService(mockRepository);

  return { mockRepository, sut };
};

describe("delete user service", () => {
  describe("when execute is called", () => {
    it("should return exception if failed to delete user", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.destroy.mockResolvedValueOnce(0);

      expect(async () => {
        await sut.execute("1");
      }).rejects.toThrow(new InternalError("Falha ao deletar usuario!"));
    });
  });
});
