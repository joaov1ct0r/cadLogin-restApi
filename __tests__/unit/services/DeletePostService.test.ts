import { mock } from "jest-mock-extended";

import IPost from "../../../src/interfaces/IPost";

import ILikes from "../../../src/interfaces/ILikes";

import IComments from "../../../src/interfaces/IComments";

import { ModelStatic } from "sequelize";

import IDeletePostService from "../../../src/interfaces/IDeletePostService";

import DeletePostService from "../../../src/services/DeletePostService";

import BadRequestError from "../../../src/errors/BadRequestError";

import InternalError from "../../../src/errors/InternalError";

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

    it("should throw an exception if fails to delete post", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: "1",
        likes: ["0"],
        comments: ["0"],
      } as IPost);

      mockRepository.destroy.mockResolvedValueOnce(0);

      expect(async () => {
        await sut.execute("1", "1");
      }).rejects.toThrow(new InternalError("Falha ao deletar post!"));
    });
  });
});
