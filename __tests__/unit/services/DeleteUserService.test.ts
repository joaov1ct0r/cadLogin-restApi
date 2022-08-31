import { mock } from "jest-mock-extended";

import DeleteUserService from "../../../src/services/DeleteUserService";

import IDeleteUserService from "../../../src/interfaces/IDeleteUserService";

import InternalError from "../../../src/errors/InternalError";

import { ModelStatic } from "sequelize";

import IUser from "../../../src/interfaces/IUser";

import IPost from "../../../src/interfaces/IPost";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IUser>>();

  const mockPostRepository = mock<ModelStatic<IPost>>();

  const sut: IDeleteUserService = new DeleteUserService(
    mockRepository,
    mockPostRepository
  );

  return { mockRepository, sut, mockPostRepository };
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

    it("should return number of deleted lines", async () => {
      const { sut, mockRepository, mockPostRepository } = makeSut();

      mockRepository.destroy.mockResolvedValueOnce(5);

      mockPostRepository.destroy.mockResolvedValueOnce(5);

      const deletedLines = await sut.execute("1");

      expect(deletedLines).toBeGreaterThan(0);
    });
  });
});
