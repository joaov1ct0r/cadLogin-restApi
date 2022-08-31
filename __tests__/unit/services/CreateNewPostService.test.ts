import { mock } from "jest-mock-extended";

import IPost from "../../../src/interfaces/IPost";

import IUser from "../../../src/interfaces/IUser";

import { ModelStatic } from "sequelize";

import ICreateNewPostService from "../../../src/interfaces/ICreateNewPostService";

import CreateNewPostService from "../../../src/services/CreateNewPostService";

import BadRequestError from "../../../src/errors/BadRequestError";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IPost>>();

  const mockUserRepository = mock<ModelStatic<IUser>>();

  const sut: ICreateNewPostService = new CreateNewPostService(
    mockRepository,
    mockUserRepository
  );

  return { sut, mockRepository, mockUserRepository };
};

describe("create new post service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if user is null", async () => {
      const { sut, mockUserRepository } = makeSut();

      mockUserRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("1", "titulo para novo post");
      }).rejects.toThrow(new BadRequestError("Usuario não encontrado!"));
    });
  });
});
