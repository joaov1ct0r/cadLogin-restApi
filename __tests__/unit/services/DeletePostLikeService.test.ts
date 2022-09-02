import { mock } from "jest-mock-extended";

import IPost from "../../../src/interfaces/IPost";

import ILikes from "../../../src/interfaces/ILikes";

import { ModelStatic } from "sequelize";

import BadRequestError from "../../../src/errors/BadRequestError";

import InternalError from "../../../src/errors/InternalError";

import IDeletePostLikeService from "../../../src/interfaces/IDeletePostLikeService";

import DeletePostLikeService from "../../../src/services/DeletePostLikeService";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IPost>>();

  const mockLikesRepository = mock<ModelStatic<ILikes>>();

  const sut: IDeletePostLikeService = new DeletePostLikeService(
    mockRepository,
    mockLikesRepository
  );

  return { sut, mockLikesRepository, mockRepository };
};

describe("delete post like service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("1", "1");
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });
  });
});
