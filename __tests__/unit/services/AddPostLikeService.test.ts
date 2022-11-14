import { mockDeep } from "jest-mock-extended";
import AddPostLikeService from "../../../src/services/AddPostLikeService";
import BadRequestError from "../../../src/errors/BadRequestError";
import { PrismaClient } from "@prisma/client";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: AddPostLikeService = new AddPostLikeService(prismaSpyRepository);

  return { sut, prismaSpyRepository };
};

describe("add post like service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findUnique.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1);
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should throw an exception if user is null", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findUnique.mockResolvedValueOnce({
        id: 1,
        userId: 1,
        author: "any@mail.com",
        content: "titulo de post",
      });

      prismaSpyRepository.user.findUnique.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1);
      }).rejects.toThrow(new BadRequestError("User não encontrado!"));
    });

    it("should throw an exception if like is already created", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findUnique.mockResolvedValueOnce({
        id: 1,
        userId: 1,
        author: "any@mail.com",
        content: "titulo de post",
      });

      prismaSpyRepository.user.findUnique.mockResolvedValueOnce({
        id: 1,
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      });

      prismaSpyRepository.likes.findUnique.mockResolvedValueOnce({
        postId: 1,
        userId: 1,
        id: 1,
        likedBy: "any@mail.com.br",
      });

      expect(async () => {
        await sut.execute(1, 1);
      }).rejects.toThrow(new BadRequestError("Like já registrado!"));
    });

    it("should return liked post", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.post.findUnique.mockResolvedValueOnce({
        id: 1,
        userId: 1,
        author: "any@mail.com",
        content: "titulo de post",
      });

      prismaSpyRepository.user.findUnique.mockResolvedValueOnce({
        id: 1,
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      });

      prismaSpyRepository.likes.findFirst.mockResolvedValueOnce(null);

      prismaSpyRepository.likes.create.mockResolvedValueOnce({
        postId: 1,
        userId: 1,
        id: 1,
        likedBy: "any@mail.com.br",
      });

      const likedPost = await sut.execute(1, 1);

      expect(likedPost).toHaveProperty("likedBy");

      expect(likedPost.postId).toEqual(1);
    });
  });
});
