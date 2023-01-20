import { mock } from "jest-mock-extended";
import CreateNewPostService from "../../../src/services/CreateNewPostService";
import BadRequestError from "../../../src/errors/BadRequestError";
import ICreateNewPostRepository from "../../../src/interfaces/ICreateNewPostRepository";
import IGetUserIdRepository from "../../../src/interfaces/IGetUserIdRepository";

const makeSut = () => {
  const createNewPostRepository = mock<ICreateNewPostRepository>();

  const getUserIdRepository = mock<IGetUserIdRepository>();

  const sut: CreateNewPostService = new CreateNewPostService(
    createNewPostRepository,
    getUserIdRepository
  );

  return { sut, createNewPostRepository, getUserIdRepository };
};

describe("create new post service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if user is null", async () => {
      const { sut, getUserIdRepository } = makeSut();

      getUserIdRepository.execute.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(1, "titulo para novo post");
      }).rejects.toThrow(new BadRequestError("Usuario não encontrado!"));
    });

    it("should return a new post if succeed", async () => {
      const { sut, getUserIdRepository, createNewPostRepository } = makeSut();

      getUserIdRepository.execute.mockResolvedValueOnce({
        id: 1,
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: true,
      });

      createNewPostRepository.execute.mockResolvedValueOnce({
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
