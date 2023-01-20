import { mock } from "jest-mock-extended";
import BadRequestError from "../../../src/errors/BadRequestError";
import ListPostService from "../../../src/services/ListPostService";
import IListPostRepository from "../../../src/interfaces/IListPostRepository";

const makeSut = () => {
  const listPostRepository = mock<IListPostRepository>();

  const sut: ListPostService = new ListPostService(listPostRepository);

  return { listPostRepository, sut };
};

describe("list post service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if post is null", async () => {
      const { sut, listPostRepository } = makeSut();

      listPostRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1);
      }).rejects.toThrow(new BadRequestError("Post não encontrado!"));
    });

    it("should return a post", async () => {
      const { sut, listPostRepository } = makeSut();

      listPostRepository.execute.mockResolvedValueOnce({
        id: 1,
        author: "any@mail.com.br",
        content: "titulo de post",
        userId: 1,
      });

      const post = await sut.execute(1);

      expect(post).toHaveProperty("content");

      expect(post.id).toEqual(1);
    });
  });
});
