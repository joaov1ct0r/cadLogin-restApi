import { mockDeep } from "jest-mock-extended";
import BadRequestError from "../../../src/errors/BadRequestError";
import { Prisma, PrismaClient } from "@prisma/client";
import DeletePostLikeService from "../../../src/services/DeletePostLikeService";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: DeletePostLikeService = new DeletePostLikeService(
    prismaSpyRepository
  );

  return { sut, prismaSpyRepository };
};

describe("delete post like service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findUnique.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1);
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should throw an exception if like is null", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findUnique.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      prismaSpyRepository.likes.findFirst.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1);
      }).rejects.toThrow(new BadRequestError("Like não encontrado!"));
    });

    it("should return number of deleted lines when deleted like", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findUnique.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      prismaSpyRepository.likes.findFirst.mockResolvedValueOnce({
        postId: 1,
        userId: 1,
        id: 1,
        likedBy: "any@mail.com.br",
      });

      prismaSpyRepository.likes.deleteMany.mockResolvedValueOnce(
        {} as Prisma.BatchPayload
      );

      const deletedLines = await sut.execute(1, 1);

      expect(deletedLines).toHaveProperty("message");

      expect(deletedLines).toEqual({ message: "Deleted" });
    });
  });
});
