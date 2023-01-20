import { mock } from "jest-mock-extended";
import DeleteUserService from "../../../src/services/DeleteUserService";
import IDeleteUserRepository from "../../../src/interfaces/IDeleteUserRepository";

const makeSut = () => {
  const deleteUserRepository = mock<IDeleteUserRepository>();

  const sut: DeleteUserService = new DeleteUserService(deleteUserRepository);

  return { deleteUserRepository, sut };
};

describe("delete user service", () => {
  describe("when execute is called", () => {
    it("should return object when succed to delete user", async () => {
      const { sut, deleteUserRepository } = makeSut();

      deleteUserRepository.execute.mockResolvedValueOnce();

      await sut.execute(1);

      expect(deleteUserRepository.execute).toHaveBeenCalledTimes(1);
    });
  });
});
