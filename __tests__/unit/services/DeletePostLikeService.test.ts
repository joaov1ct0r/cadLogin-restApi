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

    it("should throw an exception if like is null", async () => {
      const { sut, mockRepository, mockLikesRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: "1",
        likes: ["0"],
        comments: ["0"],
      } as IPost);

      mockLikesRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("1", "1");
      }).rejects.toThrow(new BadRequestError("Like não encontrado!"));
    });

    it("should throw an exception if fails to delete like", async () => {
      const { sut, mockLikesRepository, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: "1",
        likes: ["0"],
        comments: ["0"],
      } as IPost);

      mockLikesRepository.findOne.mockResolvedValueOnce({
        postId: "1",
        userId: "1",
        id: "1",
        likedBy: "any@mail.com.br",
      } as ILikes);

      mockLikesRepository.destroy.mockResolvedValueOnce(0);

      expect(async () => {
        await sut.execute("1", "1");
      }).rejects.toThrow(new InternalError("Falha ao deletar Like!"));
    });
  });
});
