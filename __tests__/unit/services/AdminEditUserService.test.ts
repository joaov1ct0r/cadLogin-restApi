import { mock } from "jest-mock-extended";

import IUser from "../../../src/interfaces/IUser";

import IAdminEditUserService from "../../../src/interfaces/IAdminEditUserService";

import AdminEditUserService from "../../../src/services/AdminEditUserService";

import { ModelStatic } from "sequelize";

// import InternalError from "../../../src/errors/InternalError";

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
  });
});
