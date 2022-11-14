import { mockDeep } from "jest-mock-extended";
import AdminDeleteUserService from "../../../src/services/AdminDeleteUserService";
import BadRequestError from "../../../src/errors/BadRequestError";
import { Prisma, PrismaClient } from "@prisma/client";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: AdminDeleteUserService = new AdminDeleteUserService(
    prismaSpyRepository
  );

  return { sut, prismaSpyRepository };
};

describe("admin delete user service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if user is null", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.user.findUnique.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("any@mail.com.br");
      }).rejects.toThrow(new BadRequestError("Usuario não encontrado!"));
    });

    it("should return object when succeed to delete user", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.user.findUnique.mockResolvedValueOnce({
        id: 1,
        email: "any@mail.com.br",
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

      const deletedLines: Object = await sut.execute("any@mail.com.br");

      expect(deletedLines).toHaveProperty("message");

      expect(deletedLines).toEqual({ message: "User deletado!" });
    });
  });
});
