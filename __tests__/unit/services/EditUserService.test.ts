import { mock } from "jest-mock-extended";

import User from "../../../src/database/models/userModel";

import EditUserService from "../../../src/services/EditUserService";

import IEditUserService from "../../../src/interfaces/IEditUserService";

import InternalError from "../../../src/errors/InternalError";

const makeSut = () => {
  const mockRepository = mock<typeof User>();

  const sut: IEditUserService = new EditUserService(mockRepository);

  return { mockRepository, sut };
};

describe("edit user service", () => {
  describe("when execute is called", () => {
    it("should throw exception if fail to edit user", async () => {
      const { sut, mockRepository } = makeSut();

      const userData = {
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "11/09/2001",
        id: "1",
      };

      mockRepository.update.mockResolvedValueOnce([0]);

      expect(async () => {
        await sut.execute(userData);
      }).rejects.toThrow(new InternalError("Falha ao atualizar usuario!"));
    });
  });
});
