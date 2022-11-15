import { Prisma, PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import BadRequestError from "../../../src/errors/BadRequestError";
import DeletePostCommentService from "../../../src/services/DeletePostCommentService";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: DeletePostCommentService = new DeletePostCommentService(
    prismaSpyRepository
  );

  return { sut, prismaSpyRepository };
};

describe("delete post comment service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findUnique.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1, 1);
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should throw an exception if comment is null", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findUnique.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      prismaSpyRepository.comment.findFirst.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1, 1);
      }).rejects.toThrow(new BadRequestError("Comentario não encontrado!"));
    });

    it("should return number of deleted lines of deleted comment", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findUnique.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      prismaSpyRepository.comment.findFirst.mockResolvedValueOnce({
        postId: 1,
        id: 1,
        author: "any@mail.com.br",
        comment: "comment de post",
        userId: 1,
      });

      prismaSpyRepository.comment.deleteMany.mockResolvedValueOnce(
        {} as Prisma.BatchPayload
      );

      const deletedLines = await sut.execute(1, 1, 1);

      expect(deletedLines).toHaveProperty("message");

      expect(deletedLines).toEqual({ message: "Comment deletado!" });
    });
  });
});
