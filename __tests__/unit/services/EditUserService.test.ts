import { mock } from "jest-mock-extended";
import EditUserService from "../../../src/services/EditUserService";
import IEditUserRepository from "../../../src/interfaces/IEditUserRepository";

const makeSut = () => {
  const editUserRepository = mock<IEditUserRepository>();

  const sut: EditUserService = new EditUserService(editUserRepository);

  return { editUserRepository, sut };
};

describe("edit user service", () => {
  describe("when execute is called", () => {
    it("should edit user", async () => {
      const { sut, editUserRepository } = makeSut();

      editUserRepository.execute.mockResolvedValueOnce();

      await sut.execute(
        "user@mail.com.br",
        "123123123",
        "user name",
        "01/09/2001",
        1
      );

      expect(editUserRepository.execute).toHaveBeenCalledTimes(1);
    });
  });
});
