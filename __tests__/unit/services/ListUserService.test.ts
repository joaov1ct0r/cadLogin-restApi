import { mock } from "jest-mock-extended";

import { ModelStatic } from "sequelize";

import IUser from "../../../src/interfaces/IUser";

import IListUserService from "../../../src/interfaces/IListUserService";

import ListUserService from "../../../src/services/ListUserService";

import BadRequestError from "../../../src/errors/BadRequestError";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IUser>>();

  const sut: IListUserService = new ListUserService(mockRepository);

  return { mockRepository, sut };
};

describe("list user service", () => {
  describe("when execute is called", () => {
    it("should return an exception if user is null", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("any@mail.com.br");
      }).rejects.toThrow(new BadRequestError("Usuario não encontrado!"));
    });
  });
});
