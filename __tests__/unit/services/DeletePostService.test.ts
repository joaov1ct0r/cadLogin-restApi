import { mockDeep } from "jest-mock-extended";
import DeletePostService from "../../../src/services/DeletePostService";
import BadRequestError from "../../../src/errors/BadRequestError";
import { Prisma, PrismaClient } from "@prisma/client";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: DeletePostService = new DeletePostService(prismaSpyRepository);

  return {
    prismaSpyRepository,
    sut,
  };
};

describe("delete post service", () => {
  describe("when execute is called", () => {
    it("should return an exception if post is null", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findFirst.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1);
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should return number of deleted lines", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findFirst.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      prismaSpyRepository.post.deleteMany.mockResolvedValueOnce(
        {} as Prisma.BatchPayload
      );

      const deletedLines = await sut.execute(1, 1);

      expect(deletedLines).toHaveProperty("message");

      expect(deletedLines).toEqual({ message: "Post deletado" });
    });
  });
});
