import { mock } from "jest-mock-extended";

import IPost from "../../../src/interfaces/IPost";

import IComments from "../../../src/interfaces/IComments";

import IUser from "../../../src/interfaces/IUser";

import IEditPostCommentService from "../../../src/interfaces/IEditPostCommentService";

import EditPostCommentService from "../../../src/services/EditPostCommentService";

import { ModelStatic } from "sequelize";

import BadRequestError from "../../../src/errors/BadRequestError";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IPost>>();

  const mockUserRepository = mock<ModelStatic<IUser>>();

  const mockCommentsRepository = mock<ModelStatic<IComments>>();

  const sut: IEditPostCommentService = new EditPostCommentService(
    mockRepository,
    mockUserRepository,
    mockCommentsRepository
  );

  return { sut, mockRepository, mockCommentsRepository, mockUserRepository };
};

describe("edit post comment service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("1", "1", "1", "comment editado de post");
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
        await sut.execute("1", "1", "1", "titulo editado de post");
      }).rejects.toThrow(new BadRequestError("Comentario não encontrado!"));
    });
  });
});
