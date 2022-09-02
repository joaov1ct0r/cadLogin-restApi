import { mock } from "jest-mock-extended";

import IPost from "../../../src/interfaces/IPost";

import ILikes from "../../../src/interfaces/ILikes";

import IUser from "../../../src/interfaces/IUser";

import { ModelStatic } from "sequelize";

import IAddPostLikeService from "../../../src/interfaces/IAddPostLikeService";

import AddPostLikeService from "../../../src/services/AddPostLikeService";

import BadRequestError from "../../../src/errors/BadRequestError";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IPost>>();

  const mockUserRepository = mock<ModelStatic<IUser>>();

  const mockLikesRepository = mock<ModelStatic<ILikes>>();

  const sut: IAddPostLikeService = new AddPostLikeService(
    mockRepository,
    mockUserRepository,
    mockLikesRepository
  );

  return { sut, mockRepository, mockUserRepository, mockLikesRepository };
};

describe("add post like service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("1", "1");
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should throw an exception if like is already created", async () => {
      const { sut, mockRepository, mockUserRepository, mockLikesRepository } =
        makeSut();

      mockRepository.findOne.mockResolvedValueOnce({
        id: "1",
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: "1",
        likes: ["0"],
        comments: ["0"],
      } as IPost);

      mockUserRepository.findOne.mockResolvedValueOnce({
        id: "1",
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "11/09/2001",
        admin: true,
      } as IUser);

      mockLikesRepository.findOne.mockResolvedValueOnce({
        postId: "1",
        userId: "1",
        id: "1",
        likedBy: "any@mail.com.br",
      } as ILikes);

      expect(async () => {
        await sut.execute("1", "1");
      }).rejects.toThrow(new BadRequestError("Like já registrado!"));
    });
  });
});
