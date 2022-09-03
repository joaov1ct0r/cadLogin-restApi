import { mock } from "jest-mock-extended";

import IUser from "../../../src/interfaces/IUser";

import IAdminEditUserService from "../../../src/interfaces/IAdminEditUserService";

import AdminEditUserService from "../../../src/services/AdminEditUserService";

import { ModelStatic } from "sequelize";

import InternalError from "../../../src/errors/InternalError";

import BadRequestError from "../../../src/errors/BadRequestError";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IUser>>();

  const sut: IAdminEditUserService = new AdminEditUserService(mockRepository);

  return { sut, mockRepository };
};

describe("admin edit user service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if user is null", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(
          "any@mail.com.br",
          "any_new@mail.com.br",
          "789789789",
          "user new name",
          "02/09/2001"
        );
      }).rejects.toThrow(new BadRequestError("Usuario não encontrado!"));
    });

    it("should throw exception if fails to edit user", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      } as IUser);

      mockRepository.update.mockResolvedValueOnce([0]);

      expect(async () => {
        await sut.execute(
          "any@mail.com.br",
          "any_new@mail.com.br",
          "789789789",
          "user new name",
          "02/09/2001"
        );
      }).rejects.toThrow(new InternalError("Falha ao atualizar usuario!"));
    });

    it("should return number of edited lines when editing user", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      } as IUser);

      mockRepository.update.mockResolvedValueOnce([4]);

      const editedLines = await sut.execute(
        "any@mail.com.br",
        "any_new@mail.com.br",
        "789789789",
        "user new name",
        "02/09/2001"
      );

      expect(editedLines).toBeGreaterThan(0);

      expect(editedLines).toEqual(4);
    });
  });
});
