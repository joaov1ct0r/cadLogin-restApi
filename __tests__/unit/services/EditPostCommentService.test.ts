import { mock } from "jest-mock-extended";
import EditPostCommentService from "../../../src/services/EditPostCommentService";
import BadRequestError from "../../../src/errors/BadRequestError";
import IGetPostIdRepository from "../../../src/interfaces/IGetPostIdRepository";
import IGetCommentRepository from "../../../src/interfaces/IGetCommentRepository";
import IGetUserIdRepository from "../../../src/interfaces/IGetUserIdRepository";
import IUpdateCommentRepository from "../../../src/interfaces/IUpdateCommentRepository";

const makeSut = () => {
  const getPostIdRepository = mock<IGetPostIdRepository>();

  const getCommentRepository = mock<IGetCommentRepository>();

  const getUserIdRepository = mock<IGetUserIdRepository>();

  const updateCommentRepository = mock<IUpdateCommentRepository>();

  const sut: EditPostCommentService = new EditPostCommentService(
    getPostIdRepository,
    getCommentRepository,
    getUserIdRepository,
    updateCommentRepository
  );

  return {
    sut,
    getPostIdRepository,
    getCommentRepository,
    getUserIdRepository,
    updateCommentRepository,
  };
};

describe("edit post comment service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, getPostIdRepository } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1, 1, "comment editado de post");
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should throw an exception if comment is null", async () => {
      const { sut, getPostIdRepository, getCommentRepository } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      getCommentRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1, 1, "titulo editado de post");
      }).rejects.toThrow(new BadRequestError("Comentario não encontrado!"));
    });

    it("should throw exception if user is null", async () => {
      const {
        sut,
        getPostIdRepository,
        getCommentRepository,
        getUserIdRepository,
      } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      getCommentRepository.execute.mockResolvedValueOnce({
        id: 1,
        author: "user@mail.com",
        comment: "qualquer comment",
        userId: 1,
        postId: 1,
      });

      getUserIdRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1, 1, "comment editado");
      }).rejects.toThrow(new BadRequestError("User não encontrado!"));
    });

    it("should edit comment", async () => {
      const {
        sut,
        getPostIdRepository,
        getCommentRepository,
        getUserIdRepository,
        updateCommentRepository,
      } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      getCommentRepository.execute.mockResolvedValueOnce({
        id: 1,
        author: "user@mail.com",
        comment: "qualquer comment",
        userId: 1,
        postId: 1,
      });

      getUserIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      });

      updateCommentRepository.execute.mockResolvedValueOnce();

      await sut.execute(1, 1, 1, "qualquer comment");

      expect(getPostIdRepository.execute).toHaveBeenCalledTimes(1);

      expect(getCommentRepository.execute).toHaveBeenCalledTimes(1);

      expect(getUserIdRepository.execute).toHaveBeenCalledTimes(1);

      expect(updateCommentRepository.execute).toHaveBeenCalledTimes(1);
    });
  });
});
