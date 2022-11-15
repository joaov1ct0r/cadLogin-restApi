import { mockDeep } from "jest-mock-extended";
import ListUserService from "../../../src/services/ListUserService";
import BadRequestError from "../../../src/errors/BadRequestError";
import { PrismaClient } from "@prisma/client";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: ListUserService = new ListUserService(prismaSpyRepository);

  return { prismaSpyRepository, sut };
};

describe("list user service", () => {
  describe("when execute is called", () => {
    it("should return an exception if user is null", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.user.findUnique.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("any@mail.com.br");
      }).rejects.toThrow(new BadRequestError("Usuario não encontrado!"));
    });

    it("should return a user if execute is succeed", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.user.findUnique.mockResolvedValueOnce({
        id: 1,
        email: "any@mail.com.br",
        name: "user name",
        password: "123123123",
        bornAt: "01/09/2001",
        admin: false,
      });

      const user = await sut.execute("any@mail.com.br");

      expect(user).toHaveProperty("id");

      expect(user.email).toEqual("any@mail.com.br");
    });
  });
});
