import { mock } from "jest-mock-extended";
import BadRequestError from "../../../src/errors/BadRequestError";
import DeletePostCommentService from "../../../src/services/DeletePostCommentService";
import IGetPostIdRepository from "../../../src/interfaces/IGetPostIdRepository";
import IGetCommentRepository from "../../../src/interfaces/IGetCommentRepository";
import IDeleteCommentRepository from "../../../src/interfaces/IDeleteCommentRepository";

const makeSut = () => {
  const getPostIdRepository = mock<IGetPostIdRepository>();

  const getCommentIdRepository = mock<IGetCommentRepository>();

  const deleteCommentRepository = mock<IDeleteCommentRepository>();

  const sut: DeletePostCommentService = new DeletePostCommentService(
    getPostIdRepository,
    getCommentIdRepository,
    deleteCommentRepository
  );

  return {
    sut,
    getPostIdRepository,
    getCommentIdRepository,
    deleteCommentRepository,
  };
};

describe("delete post comment service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, getPostIdRepository } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1, 1);
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should throw an exception if comment is null", async () => {
      const { sut, getPostIdRepository, getCommentIdRepository } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      getCommentIdRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1, 1);
      }).rejects.toThrow(new BadRequestError("Comentario não encontrado!"));
    });

    it("should delete comment", async () => {
      const {
        sut,
        getPostIdRepository,
        getCommentIdRepository,
        deleteCommentRepository,
      } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      getCommentIdRepository.execute.mockResolvedValueOnce({
        postId: 1,
        id: 1,
        author: "any@mail.com.br",
        comment: "comment de post",
        userId: 1,
      });

      deleteCommentRepository.execute.mockResolvedValueOnce();

      await sut.execute(1, 1, 1);

      expect(getPostIdRepository.execute).toHaveBeenCalledTimes(1);

      expect(getCommentIdRepository.execute).toHaveBeenCalledTimes(1);

      expect(deleteCommentRepository.execute).toHaveBeenCalledTimes(1);
    });
  });
});
