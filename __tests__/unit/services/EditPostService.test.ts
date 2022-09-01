import { mock } from "jest-mock-extended";

import IPost from "../../../src/interfaces/IPost";

import EditPostService from "../../../src/services/EditPostService";

import IEditPostService from "../../../src/interfaces/IEditPostService";

import { ModelStatic } from "sequelize";
import BadRequestError from "../../../src/errors/BadRequestError";

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
  });
});
