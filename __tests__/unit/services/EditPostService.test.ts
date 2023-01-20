import { mock } from "jest-mock-extended";
import EditPostService from "../../../src/services/EditPostService";
import BadRequestError from "../../../src/errors/BadRequestError";
import IGetPostIdRepository from "../../../src/interfaces/IGetPostIdRepository";
import IUpdatePostRepository from "../../../src/interfaces/IUpdatePostRepository";

const makeSut = () => {
  const getPostIdRepository = mock<IGetPostIdRepository>();

  const updatePostRepository = mock<IUpdatePostRepository>();

  const sut: EditPostService = new EditPostService(
    getPostIdRepository,
    updatePostRepository
  );

  return { getPostIdRepository, updatePostRepository, sut };
};

describe("edit post service", () => {
  describe("when execute is called", () => {
    it("should throw exception if post is null", async () => {
      const { sut, getPostIdRepository } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, 1, "titulo editado para post");
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should return an object when succed to edit post", async () => {
      const { sut, getPostIdRepository, updatePostRepository } = makeSut();

      getPostIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      updatePostRepository.execute.mockResolvedValueOnce();

      await sut.execute(1, 1, "titulo editado de post");

      expect(getPostIdRepository.execute).toHaveBeenCalledTimes(1);

      expect(updatePostRepository.execute).toHaveBeenCalledTimes(1);
    });
  });
});
