import { Prisma, PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import DeleteUserService from "../../../src/services/DeleteUserService";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: DeleteUserService = new DeleteUserService(prismaSpyRepository);

  return { prismaSpyRepository, sut };
};

describe("delete user service", () => {
  describe("when execute is called", () => {
    it("should return object when succed to delete user", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.user.delete.mockResolvedValueOnce({
        id: 1,
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      });

      prismaSpyRepository.post.deleteMany.mockResolvedValueOnce(
        {} as Prisma.BatchPayload
      );

      prismaSpyRepository.likes.deleteMany.mockResolvedValueOnce(
        {} as Prisma.BatchPayload
      );

      prismaSpyRepository.comment.deleteMany.mockResolvedValueOnce(
        {} as Prisma.BatchPayload
      );

      const deletedLines = await sut.execute(1);

      expect(deletedLines).toHaveProperty("message");

      expect(deletedLines).toEqual({ message: "Deletado" });
    });
  });
});
