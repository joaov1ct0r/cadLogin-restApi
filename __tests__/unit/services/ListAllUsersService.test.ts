import { mock } from "jest-mock-extended";
import ListAllUsersService from "../../../src/services/ListAllUsersService";
import IListUsersRepository from "../../../src/interfaces/IListUsersRepository";

const makeSut = () => {
  const listUsersRepository = mock<IListUsersRepository>();

  const sut: ListAllUsersService = new ListAllUsersService(listUsersRepository);

  return { listUsersRepository, sut };
};

describe("list all users service", () => {
  describe("when execute is called", () => {
    it("should return all users registered", async () => {
      const { sut, listUsersRepository } = makeSut();

      listUsersRepository.execute.mockResolvedValueOnce([
        {
          id: 1,
          email: "any@mail.com.br",
          password: "123123123",
          name: "user name",
          bornAt: "01/09/2001",
          admin: false,
        },
        {
          id: 2,
          email: "any@mail.com.br",
          password: "123123123",
          name: "user name",
          bornAt: "01/09/2001",
          admin: false,
        },
      ]);

      const users = await sut.execute();

      expect(users.length).toBe(2);

      expect(users[0].email).toEqual("any@mail.com.br");
    });
  });
});
