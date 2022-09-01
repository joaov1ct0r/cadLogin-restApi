import { mock } from "jest-mock-extended";

import IPost from "../../../src/interfaces/IPost";

import { ModelStatic } from "sequelize";

import BadRequestError from "../../../src/errors/BadRequestError";

import IListPostService from "../../../src/interfaces/IListPostService";

import ListPostService from "../../../src/services/ListPostService";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IPost>>();

  const sut: IListPostService = new ListPostService(mockRepository);

  return { mockRepository, sut };
};

describe("list post service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("1");
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should return a post", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: "1",
        likes: ["0"],
        comments: ["0"],
      } as IPost);

      const post = await sut.execute("1");

      expect(post).toHaveProperty("content");

      expect(post.id).toEqual("1");
    });
  });
});
