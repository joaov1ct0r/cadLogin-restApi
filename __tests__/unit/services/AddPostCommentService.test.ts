import { mock } from "jest-mock-extended";

import IPost from "../../../src/interfaces/IPost";

import IComments from "../../../src/interfaces/IComments";

import IUser from "../../../src/interfaces/IUser";

import IAddPostCommentService from "../../../src/interfaces/IAddPostCommentService";

import AddPostCommentService from "../../../src/services/AddPostCommentService";

import { ModelStatic } from "sequelize";

import BadRequestError from "../../../src/errors/BadRequestError";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IPost>>();

  const mockUserRepository = mock<ModelStatic<IUser>>();

  const mockCommentsRepository = mock<ModelStatic<IComments>>();

  const sut: IAddPostCommentService = new AddPostCommentService(
    mockRepository,
    mockCommentsRepository,
    mockUserRepository
  );

  return { sut, mockRepository, mockUserRepository, mockCommentsRepository };
};

describe("add post comment service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("1", "1", "comment de post");
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should return created comment when succeed", async () => {
      const {
        sut,
        mockCommentsRepository,
        mockUserRepository,
        mockRepository,
      } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: "1",
        likes: ["0"],
        comments: ["0"],
      } as IPost);

      mockUserRepository.findOne.mockResolvedValueOnce({
        id: "1",
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: true,
      } as IUser);

      mockCommentsRepository.create.mockResolvedValueOnce({
        postId: "1",
        id: "1",
        author: "any@mail.com.br",
        comment: "comment de post",
      } as IComments);

      const createdComment = await sut.execute("1", "1", "comment de post");

      expect(createdComment).toHaveProperty("comment");

      expect(createdComment.author).toEqual("any@mail.com.br");
    });
  });
});
