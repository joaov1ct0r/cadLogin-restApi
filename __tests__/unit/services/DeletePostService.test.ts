import { mock } from "jest-mock-extended";

import IPost from "../../../src/interfaces/IPost";

import ILikes from "../../../src/interfaces/ILikes";

import IComments from "../../../src/interfaces/IComments";

import { ModelStatic } from "sequelize";

import IDeletePostService from "../../../src/interfaces/IDeletePostService";

import DeletePostService from "../../../src/services/DeletePostService";

import BadRequestError from "../../../src/errors/BadRequestError";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IPost>>();

  const mockCommentsRepository = mock<ModelStatic<IComments>>();

  const mockLikesRepository = mock<ModelStatic<ILikes>>();

  const sut: IDeletePostService = new DeletePostService(
    mockRepository,
    mockCommentsRepository,
    mockLikesRepository
  );

  return { mockRepository, mockCommentsRepository, mockLikesRepository, sut };
};

describe("delete post service", () => {
  describe("when execute is called", () => {
    it("should return an exception if post is null", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("1", "1");
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });
  });
});
