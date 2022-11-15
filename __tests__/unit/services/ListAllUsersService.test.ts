import { mockDeep } from "jest-mock-extended";
import ListAllUsersService from "../../../src/services/ListAllUsersService";
import { PrismaClient } from "@prisma/client";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: ListAllUsersService = new ListAllUsersService(prismaSpyRepository);

  return { prismaSpyRepository, sut };
};

describe("list all users service", () => {
  describe("when execute is called", () => {
    it("should return all users registered", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.user.findMany.mockResolvedValueOnce([
        {
          id: 1,
          email: "any@mail.com.br",
          password: "123123123",
          name: "user name",
          bornAt: "01/09/2001",
          admin: false,
        },
        {
          id: 2,
          email: "any@mail.com.br",
          password: "123123123",
          name: "user name",
          bornAt: "01/09/2001",
          admin: false,
        },
      ]);

      const users = await sut.execute();

      expect(users.length).toBe(2);

      expect(users[0].email).toEqual("any@mail.com.br");
    });
  });
});
