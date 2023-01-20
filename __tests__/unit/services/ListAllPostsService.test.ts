import { mock } from "jest-mock-extended";
import ListAllPostsService from "../../../src/services/ListAllPostsService";
import IListAllPostsRepository from "../../../src/interfaces/IListAllPostsRepository";

const makeSut = () => {
  const listAllPostsRepository = mock<IListAllPostsRepository>();

  const sut: ListAllPostsService = new ListAllPostsService(
    listAllPostsRepository
  );

  return { sut, listAllPostsRepository };
};

describe("list all posts service", () => {
  describe("when execute is called", () => {
    it("should return all posts", async () => {
      const { sut, listAllPostsRepository } = makeSut();

      listAllPostsRepository.execute.mockResolvedValueOnce([
        {
          id: 1,
          author: "any@mail.com.br",
          content: "titulo de post",
          userId: 1,
        },
        {
          id: 1,
          author: "any@mail.com.br",
          content: "titulo de post",
          userId: 1,
        },
        {
          id: 1,
          author: "any@mail.com.br",
          content: "titulo de post",
          userId: 1,
        },
      ]);

      const posts = await sut.execute();

      expect(posts.length).toEqual(3);

      expect(posts[0]).toHaveProperty("author");
    });
  });
});
