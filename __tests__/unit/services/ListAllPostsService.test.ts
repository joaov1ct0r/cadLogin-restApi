import { mockDeep } from "jest-mock-extended";
import ListAllPostsService from "../../../src/services/ListAllPostsService";
import { PrismaClient } from "@prisma/client";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: ListAllPostsService = new ListAllPostsService(prismaSpyRepository);

  return { sut, prismaSpyRepository };
};

describe("list all posts service", () => {
  describe("when execute is called", () => {
    it("should return all posts", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findMany.mockResolvedValueOnce([
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
