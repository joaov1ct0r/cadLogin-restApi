import { mock } from "jest-mock-extended";
import BadRequestError from "../../../src/errors/BadRequestError";
import DeletePostLikeService from "../../../src/services/DeletePostLikeService";
import IGetPostIdRepository from "../../../src/interfaces/IGetPostIdRepository";
import IGetLikeIdRepository from "../../../src/interfaces/IGetLikeIdRepository";
import IDeleteLikeRepository from "../../../src/interfaces/IDeleteLikeRepository";

const makeSut = () => {
  const getPostIdRepository = mock<IGetPostIdRepository>();

  const getLikeIdRepository = mock<IGetLikeIdRepository>();

  const deleteLikeRepository = mock<IDeleteLikeRepository>();

  const sut: DeletePostLikeService = new DeletePostLikeService(
    getPostIdRepository,
    getLikeIdRepository,
    deleteLikeRepository
  );

  return {
    sut,
    getPostIdRepository,
    getLikeIdRepository,
    deleteLikeRepository,
  };
};

describe("delete post like service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, getPostIdRepository } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1);
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should throw an exception if like is null", async () => {
      const { sut, getPostIdRepository, getLikeIdRepository } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      getLikeIdRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1);
      }).rejects.toThrow(new BadRequestError("Like não encontrado!"));
    });

    it("should delete like", async () => {
      const {
        sut,
        getPostIdRepository,
        getLikeIdRepository,
        deleteLikeRepository,
      } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      getLikeIdRepository.execute.mockResolvedValueOnce({
        postId: 1,
        userId: 1,
        id: 1,
        likedBy: "any@mail.com.br",
      });

      deleteLikeRepository.execute.mockResolvedValueOnce();

      await sut.execute(1, 1);

      expect(getPostIdRepository.execute).toHaveBeenCalledTimes(1);

      expect(getLikeIdRepository.execute).toHaveBeenCalledTimes(1);

      expect(deleteLikeRepository.execute).toHaveBeenCalledTimes(1);
    });
  });
});
