import { mockDeep } from "jest-mock-extended";
import BadRequestError from "../../../src/errors/BadRequestError";
import ListPostService from "../../../src/services/ListPostService";
import { PrismaClient } from "@prisma/client";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: ListPostService = new ListPostService(prismaSpyRepository);

  return { prismaSpyRepository, sut };
};

describe("list post service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findFirst.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1);
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should return a post", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findFirst.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      const post = await sut.execute(1);

      expect(post).toHaveProperty("content");

      expect(post.id).toEqual(1);
    });
  });
});
