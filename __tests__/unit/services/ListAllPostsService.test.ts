import { mock } from "jest-mock-extended";

import IPost from "../../../src/interfaces/IPost";

import { ModelStatic } from "sequelize";

import ListAllPostsService from "../../../src/services/ListAllPostsService";
import IListAllPostsService from "../../../src/interfaces/IListAllPostsService";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IPost>>();

  const sut: IListAllPostsService = new ListAllPostsService(mockRepository);

  return { sut, mockRepository };
};

describe("list all posts service", () => {
  describe("when execute is called", () => {
    it("should return all posts", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findAll.mockResolvedValueOnce([
        {
          id: "1",
          author: "any@mail.com.br",
          content: "titulo de post",
          userId: "1",
          likes: ["0"],
          comments: ["0"],
        } as IPost,
        {
          id: "1",
          author: "any@mail.com.br",
          content: "titulo de post",
          userId: "1",
          likes: ["0"],
          comments: ["0"],
        } as IPost,
        {
          id: "1",
          author: "any@mail.com.br",
          content: "titulo de post",
          userId: "1",
          likes: ["0"],
          comments: ["0"],
        } as IPost,
      ]);

      const posts = await sut.execute();

      expect(posts.length).toEqual(3);

      expect(posts[0]).toHaveProperty("author");
    });
  });
});
