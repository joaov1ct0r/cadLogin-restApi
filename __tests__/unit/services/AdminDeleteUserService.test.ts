import { mock } from "jest-mock-extended";

import IUser from "../../../src/interfaces/IUser";

import { ModelStatic } from "sequelize";

import IPost from "../../../src/interfaces/IPost";

import IAdminDeleteUserService from "../../../src/interfaces/IAdminDeleteUserService";

import AdminDeleteUserService from "../../../src/services/AdminDeleteUserService";
import BadRequestError from "../../../src/errors/BadRequestError";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IUser>>();

  const mockPostRepository = mock<ModelStatic<IPost>>();

  const sut: IAdminDeleteUserService = new AdminDeleteUserService(
    mockRepository,
    mockPostRepository
  );

  return { sut, mockPostRepository, mockRepository };
};

describe("admin delete user service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if user is null", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("any@mail.com.br");
      }).rejects.toThrow(new BadRequestError("Usuario não encontrado!"));
    });
  });
});
