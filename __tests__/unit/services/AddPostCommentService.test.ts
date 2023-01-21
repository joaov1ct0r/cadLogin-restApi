import { mock } from "jest-mock-extended";
import AddPostCommentService from "../../../src/services/AddPostCommentService";
import BadRequestError from "../../../src/errors/BadRequestError";
import IGetPostIdRepository from "../../../src/interfaces/IGetPostIdRepository";
import IGetUserIdRepository from "../../../src/interfaces/IGetUserIdRepository";
import ICreateCommentRepository from "../../../src/interfaces/ICreateCommentRepository";

const makeSut = () => {
  const getPostIdRepository = mock<IGetPostIdRepository>();

  const getUserIdRepository = mock<IGetUserIdRepository>();

  const createCommentRepository = mock<ICreateCommentRepository>();

  const sut: AddPostCommentService = new AddPostCommentService(
    getPostIdRepository,
    getUserIdRepository,
    createCommentRepository
  );

  return {
    sut,
    getPostIdRepository,
    getUserIdRepository,
    createCommentRepository,
  };
};

describe("add post comment service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, getPostIdRepository } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1, "comment de post");
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should throw an exception if user is null", async () => {
      const { sut, getPostIdRepository, getUserIdRepository } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "um titulo",
        userId: 1,
      });

      getUserIdRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1, "comment de post");
      }).rejects.toThrow(new BadRequestError("User não encontrado!"));
    });

    it("should return created comment when succeed", async () => {
      const {
        sut,
        getPostIdRepository,
        getUserIdRepository,
        createCommentRepository,
      } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      getUserIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      });

      createCommentRepository.execute.mockResolvedValueOnce({
        postId: 1,
        id: 1,
        userId: 1,
        author: "any@mail.com.br",
        comment: "comment de post",
      });

      const createdComment = await sut.execute(1, 1, "comment de post");

      expect(createdComment).toHaveProperty("comment");

      expect(createdComment.author).toEqual("any@mail.com.br");
    });
  });
});
