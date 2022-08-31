import { mock } from "jest-mock-extended";

import IPost from "../../../src/interfaces/IPost";

import IUser from "../../../src/interfaces/IUser";

import { ModelStatic } from "sequelize";

import ICreateNewPostService from "../../../src/interfaces/ICreateNewPostService";

import CreateNewPostService from "../../../src/services/CreateNewPostService";

import BadRequestError from "../../../src/errors/BadRequestError";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IPost>>();

  const mockUserRepository = mock<ModelStatic<IUser>>();

  const sut: ICreateNewPostService = new CreateNewPostService(
    mockRepository,
    mockUserRepository
  );

  return { sut, mockRepository, mockUserRepository };
};

describe("create new post service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if user is null", async () => {
      const { sut, mockUserRepository } = makeSut();

      mockUserRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute("1", "titulo para novo post");
      }).rejects.toThrow(new BadRequestError("Usuario não encontrado!"));
    });

    it("should return a new post if succeed", async () => {
      const { sut, mockRepository, mockUserRepository } = makeSut();

      mockUserRepository.findOne.mockResolvedValueOnce({
        id: "1",
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "11/09/2001",
        admin: true,
      } as IUser);

      mockRepository.create.mockResolvedValueOnce({
        id: "1",
        author: "any@mail.com.br",
        content: "novo titulo de post",
        userId: "1",
        likes: ["0"],
        comments: ["0"],
      } as IPost);

      const post = await sut.execute("1", "novo titulo de post");

      expect(post.author).toEqual("any@mail.com.br");

      expect(post.content).toEqual("novo titulo de post");

      expect(post).toHaveProperty("id");
    });
  });
});
