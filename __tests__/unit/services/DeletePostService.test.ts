import { mock } from "jest-mock-extended";
import DeletePostService from "../../../src/services/DeletePostService";
import BadRequestError from "../../../src/errors/BadRequestError";
import IGetPostIdRepository from "../../../src/interfaces/IGetPostIdRepository";
import IDeletePostRepository from "../../../src/interfaces/IDeletePostRepository";

const makeSut = () => {
  const getPostIdRepository = mock<IGetPostIdRepository>();

  const deletePostRepository = mock<IDeletePostRepository>();

  const sut: DeletePostService = new DeletePostService(
    getPostIdRepository,
    deletePostRepository
  );

  return {
    getPostIdRepository,
    deletePostRepository,
    sut,
  };
};

describe("delete post service", () => {
  describe("when execute is called", () => {
    it("should return an exception if post is null", async () => {
      const { sut, getPostIdRepository } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1);
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should delete post", async () => {
      const { sut, getPostIdRepository, deletePostRepository } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      deletePostRepository.execute.mockResolvedValueOnce();

      await sut.execute(1, 1);

      expect(getPostIdRepository.execute).toHaveBeenCalledTimes(1);

      expect(deletePostRepository.execute).toHaveBeenCalledTimes(1);
    });
  });
});
