import { mockDeep } from "jest-mock-extended";
import CreateUserService from "../../../src/services/CreateUserService";
import BadRequestError from "../../../src/errors/BadRequestError";
import { PrismaClient } from "@prisma/client";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: CreateUserService = new CreateUserService(prismaSpyRepository);

  return { sut, prismaSpyRepository };
};

describe("create user service", () => {
  describe("when execute is called", () => {
    it("should throw an error if user already exists", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      const userInputData = {
        email: "user@email.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
      };

      prismaSpyRepository.user.findUnique.mockResolvedValue({
        id: 1,
        email: "user@email.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      });

      expect(async () => {
        await sut.execute(userInputData);
      }).rejects.toThrow(new BadRequestError("Usuario já cadastrado!"));
    });

    it("should create a new user", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      const userInputData = {
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
      };

      prismaSpyRepository.user.findUnique.mockResolvedValue(null);

      prismaSpyRepository.user.create.mockResolvedValue({
        id: 1,
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      });

      const user = await sut.execute(userInputData);

      expect(user).toHaveProperty("id");
    });
  });
});
