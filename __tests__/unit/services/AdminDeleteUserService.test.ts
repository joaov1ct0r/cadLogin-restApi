import { mock } from "jest-mock-extended";

import IUser from "../../../src/interfaces/IUser";

import { ModelStatic } from "sequelize";

import IPost from "../../../src/interfaces/IPost";

import IAdminDeleteUserService from "../../../src/interfaces/IAdminDeleteUserService";

import AdminDeleteUserService from "../../../src/services/AdminDeleteUserService";

import BadRequestError from "../../../src/errors/BadRequestError";

import InternalError from "../../../src/errors/InternalError";

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

    it("should throw an exception if fails to delete user", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      } as IUser);

      mockRepository.destroy.mockResolvedValueOnce(0);

      expect(async () => {
        await sut.execute("any@mail.com.br");
      }).rejects.toThrow(new InternalError("Falha ao deletar usuario!"));
    });

    it("should return number of deleted lines when succeed to delete user", async () => {
      const { sut, mockRepository, mockPostRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      } as IUser);

      mockRepository.destroy.mockResolvedValueOnce(5);

      mockPostRepository.destroy.mockResolvedValueOnce(5);

      const deletedLines = await sut.execute("any@mail.com.br");

      expect(deletedLines).toBeGreaterThan(0);

      expect(deletedLines).toEqual(5);
    });
  });
});
