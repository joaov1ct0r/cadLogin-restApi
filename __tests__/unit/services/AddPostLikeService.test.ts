import { mock } from "jest-mock-extended";
import AddPostLikeService from "../../../src/services/AddPostLikeService";
import BadRequestError from "../../../src/errors/BadRequestError";
import IGetPostIdRepository from "../../../src/interfaces/IGetPostIdRepository";
import IGetUserIdRepository from "../../../src/interfaces/IGetUserIdRepository";
import IGetLikeIdRepository from "../../../src/interfaces/IGetLikeIdRepository";
import ICreateLikeRepository from "../../../src/interfaces/ICreateLikeRepository";

const makeSut = () => {
  const getPostIdRepository = mock<IGetPostIdRepository>();

  const getUserIdRepository = mock<IGetUserIdRepository>();

  const getLikeIdRepository = mock<IGetLikeIdRepository>();

  const createLikeRepository = mock<ICreateLikeRepository>();

  const sut: AddPostLikeService = new AddPostLikeService(
    getPostIdRepository,
    getUserIdRepository,
    getLikeIdRepository,
    createLikeRepository
  );

  return {
    sut,
    getPostIdRepository,
    getUserIdRepository,
    getLikeIdRepository,
    createLikeRepository,
  };
};

describe("add post like service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, getPostIdRepository } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1);
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should throw an exception if user is null", async () => {
      const { sut, getPostIdRepository, getUserIdRepository } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        userId: 1,
        author: "any@mail.com",
        content: "titulo de post",
      });

      getUserIdRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1);
      }).rejects.toThrow(new BadRequestError("User não encontrado!"));
    });

    it("should throw an exception if like is already created", async () => {
      const {
        sut,
        getPostIdRepository,
        getUserIdRepository,
        getLikeIdRepository,
      } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        userId: 1,
        author: "any@mail.com",
        content: "titulo de post",
      });

      getUserIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      });

      getLikeIdRepository.execute.mockResolvedValueOnce({
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
      const {
        sut,
        getPostIdRepository,
        getUserIdRepository,
        getLikeIdRepository,
        createLikeRepository,
      } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        userId: 1,
        author: "any@mail.com",
        content: "titulo de post",
      });

      getUserIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      });

      getLikeIdRepository.execute.mockResolvedValueOnce(null);

      createLikeRepository.execute.mockResolvedValueOnce({
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
