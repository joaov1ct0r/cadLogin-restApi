import { mock } from "jest-mock-extended";

import IPost from "../../../src/interfaces/IPost";

import IComments from "../../../src/interfaces/IComments";

import { ModelStatic } from "sequelize";

import BadRequestError from "../../../src/errors/BadRequestError";

import InternalError from "../../../src/errors/InternalError";

import IDeletePostCommentService from "../../../src/interfaces/IDeletePostCommentService";

import DeletePostCommentService from "../../../src/services/DeletePostCommentService";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IPost>>();

  const mockCommentsRepository = mock<ModelStatic<IComments>>();

  const sut: IDeletePostCommentService = new DeletePostCommentService(
    mockRepository,
    mockCommentsRepository
  );

  return { sut, mockRepository, mockCommentsRepository };
};

describe("delete post comment service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("1", "1", "1");
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should throw an exception if comment is null", async () => {
      const { sut, mockRepository, mockCommentsRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: "1",
        likes: ["0"],
        comments: ["0"],
      } as IPost);

      mockCommentsRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("1", "1", "1");
      }).rejects.toThrow(new BadRequestError("Comentario não encontrado!"));
    });

    it("should throw an exception if fails to delete comment is null", async () => {
      const { sut, mockRepository, mockCommentsRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: "1",
        likes: ["0"],
        comments: ["0"],
      } as IPost);

      mockCommentsRepository.findOne.mockResolvedValueOnce({
        postId: "1",
        id: "1",
        author: "any@mail.com.br",
        comment: "comment de post",
      } as IComments);

      mockCommentsRepository.destroy.mockResolvedValueOnce(0);

      expect(async () => {
        await sut.execute("1", "1", "1");
      }).rejects.toThrow(new InternalError("Falha ao deletar comentario!"));
    });

    it("should return number of deleted lines of deleted comment", async () => {
      const { sut, mockRepository, mockCommentsRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: "1",
        likes: ["0"],
        comments: ["0"],
      } as IPost);

      mockCommentsRepository.findOne.mockResolvedValueOnce({
        postId: "1",
        id: "1",
        author: "any@mail.com.br",
        comment: "comment de post",
      } as IComments);

      mockCommentsRepository.destroy.mockResolvedValueOnce(4);

      const deletedLines = await sut.execute("1", "1", "1");

      expect(deletedLines).toBeGreaterThan(0);

      expect(deletedLines).toEqual(4);
    });
  });
});
