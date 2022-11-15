import { mockDeep } from "jest-mock-extended";
import CreateNewPostService from "../../../src/services/CreateNewPostService";
import BadRequestError from "../../../src/errors/BadRequestError";
import { PrismaClient } from "@prisma/client";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: CreateNewPostService = new CreateNewPostService(
    prismaSpyRepository
  );

  return { sut, prismaSpyRepository };
};

describe("create new post service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if user is null", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.user.findUnique.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, "titulo para novo post");
      }).rejects.toThrow(new BadRequestError("Usuario não encontrado!"));
    });

    it("should return a new post if succeed", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.user.findUnique.mockResolvedValueOnce({
        id: 1,
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: true,
      });

      prismaSpyRepository.post.create.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "novo titulo de post",
        userId: 1,
      });

      const post = await sut.execute(1, "novo titulo de post");

      expect(post.author).toEqual("any@mail.com.br");

      expect(post.content).toEqual("novo titulo de post");

      expect(post).toHaveProperty("id");
    });
  });
});
