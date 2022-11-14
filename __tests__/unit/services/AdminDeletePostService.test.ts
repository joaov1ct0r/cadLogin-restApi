import { mockDeep } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";
import AdminDeletePostService from "../../../src/services/AdminDeletePostService";
import BadRequestError from "../../../src/errors/BadRequestError";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: AdminDeletePostService = new AdminDeletePostService(
    prismaSpyRepository
  );

  return { sut, prismaSpyRepository };
};

describe("admin delete post service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findUnique.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1);
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should return number of deleted lines when succeed to delete post", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findUnique.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      prismaSpyRepository.post.delete.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      const deletedLines = await sut.execute(1);

      expect(deletedLines).toHaveProperty("message");

      expect(deletedLines).toEqual({ message: "Post deletado!" });
    });
  });
});
