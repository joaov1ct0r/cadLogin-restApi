import { mockDeep } from "jest-mock-extended";
import EditPostService from "../../../src/services/EditPostService";
import BadRequestError from "../../../src/errors/BadRequestError";
import { Prisma, PrismaClient } from "@prisma/client";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: EditPostService = new EditPostService(prismaSpyRepository);

  return { prismaSpyRepository, sut };
};

describe("edit post service", () => {
  describe("when execute is called", () => {
    it("should throw exception if post is null", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findFirst.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1, "titulo editado para post");
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should return an object when succed to edit post", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findFirst.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      prismaSpyRepository.post.updateMany.mockResolvedValueOnce(
        {} as Prisma.BatchPayload
      );

      const deletedLines = await sut.execute(1, 1, "titulo editado de post");

      expect(deletedLines).toHaveProperty("message");

      expect(deletedLines).toEqual({ message: "Post editado!" });
    });
  });
});
