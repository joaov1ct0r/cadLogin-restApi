import { mock } from "jest-mock-extended";

import IPost from "../../../src/interfaces/IPost";

import EditPostService from "../../../src/services/EditPostService";

import IEditPostService from "../../../src/interfaces/IEditPostService";

import { ModelStatic } from "sequelize";

import BadRequestError from "../../../src/errors/BadRequestError";
import InternalError from "../../../src/errors/InternalError";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IPost>>();

  const sut: IEditPostService = new EditPostService(mockRepository);

  return { mockRepository, sut };
};

describe("edit post service", () => {
  describe("when execute is called", () => {
    it("should throw exception if post is null", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("1", "1", "titulo editado para post");
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should return exception if failed to edit post", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: "1",
        likes: ["0"],
        comments: ["0"],
      } as IPost);

      mockRepository.update.mockResolvedValueOnce([0]);

      expect(async () => {
        await sut.execute("1", "1", "titulo editado de post");
      }).rejects.toThrow(new InternalError("Falha ao atualizar Post!"));
    });
  });
});
