import { mock } from "jest-mock-extended";

import { ModelStatic } from "sequelize";

import IUser from "../../../src/interfaces/IUser";

import IListAllUsersService from "../../../src/interfaces/IListAllUsersService";

import ListAllUsersService from "../../../src/services/ListAllUsersService";

const makeSut = () => {
  const mockRepository = mock<ModelStatic<IUser>>();

  const sut: IListAllUsersService = new ListAllUsersService(mockRepository);

  return { mockRepository, sut };
};

describe("list all users service", () => {
  describe("when execute is called", () => {
    it("should return all users registered", async () => {
      const { sut, mockRepository } = makeSut();

      mockRepository.findAll.mockResolvedValueOnce([
        {
          id: "1",
          email: "any@mail.com.br",
          password: "123123123",
          name: "user name",
          bornAt: "01/09/2001",
          admin: true,
        } as IUser,
        {
          id: "1",
          email: "any@mail.com.br",
          password: "123123123",
          name: "user name",
          bornAt: "01/09/2001",
          admin: true,
        } as IUser,
      ]);

      const users = await sut.execute();

      expect(users.length).toBe(2);

      expect(users[0].email).toEqual("any@mail.com.br");
    });
  });
});
