import { mockDeep } from "jest-mock-extended";
import EditUserService from "../../../src/services/EditUserService";
import { PrismaClient } from "@prisma/client";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: EditUserService = new EditUserService(prismaSpyRepository);

  return { prismaSpyRepository, sut };
};

describe("edit user service", () => {
  describe("when execute is called", () => {
    it("should return number of affected lines if succeed to edit user", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      const userData = {
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        userId: 1,
      };

      prismaSpyRepository.user.update.mockResolvedValueOnce({
        id: 1,
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      });

      const editedLines = await sut.execute(userData);

      expect(editedLines).toEqual({
        id: 1,
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      });

      expect(editedLines).toHaveProperty("id");
    });
  });
});
