import { mock } from "jest-mock-extended";

import { ModelStatic } from "sequelize";

import IPost from "../../../src/interfaces/IPost";

import IAdminDeletePostService from "../../../src/interfaces/IAdminDeletePostService";

import AdminDeletePostService from "../../../src/services/AdminDeletePostService";

import BadRequestError from "../../../src/errors/BadRequestError";

import InternalError from "../../../src/errors/InternalError";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IPost>>();

  const sut: IAdminDeletePostService = new AdminDeletePostService(
    mockRepository
  );

  return { sut, mockRepository };
};

describe("admin delete post service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("1");
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
        await sut.execute("1");
      }).rejects.toThrow(new InternalError("Falha ao deletar Post!"));
    });
  });
});
