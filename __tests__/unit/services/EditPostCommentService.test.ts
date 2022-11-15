import { mockDeep } from "jest-mock-extended";
import EditPostCommentService from "../../../src/services/EditPostCommentService";
import BadRequestError from "../../../src/errors/BadRequestError";
import { Prisma, PrismaClient } from "@prisma/client";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: EditPostCommentService = new EditPostCommentService(
    prismaSpyRepository
  );

  return { sut, prismaSpyRepository };
};

describe("edit post comment service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findUnique.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1, 1, "comment editado de post");
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
        await sut.execute(1, 1, 1, "titulo editado de post");
      }).rejects.toThrow(new BadRequestError("Comentario não encontrado!"));
    });

    it("should throw exception if user is null", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findUnique.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      prismaSpyRepository.comment.findFirst.mockResolvedValueOnce({
        id: 1,
        author: "user@mail.com",
        comment: "qualquer comment",
        userId: 1,
        postId: 1,
      });

      prismaSpyRepository.user.findUnique.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1, 1, "comment editado");
      }).rejects.toThrow(new BadRequestError("User não encontrado!"));
    });

    it("should return number of edited lines from edited comment", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findUnique.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      prismaSpyRepository.comment.findFirst.mockResolvedValueOnce({
        id: 1,
        author: "user@mail.com",
        comment: "qualquer comment",
        userId: 1,
        postId: 1,
      });

      prismaSpyRepository.user.findUnique.mockResolvedValueOnce({
        id: 1,
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      });

      prismaSpyRepository.comment.updateMany.mockResolvedValueOnce(
        {} as Prisma.BatchPayload
      );

      const editedLines = await sut.execute(1, 1, 1, "qualquer comment");

      expect(editedLines).toHaveProperty("message");

      expect(editedLines).toEqual({ message: "Comment atualizado" });
    });
  });
});
