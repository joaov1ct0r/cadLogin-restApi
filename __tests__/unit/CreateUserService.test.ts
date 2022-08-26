import { mock } from "jest-mock-extended";

import IUser from "../../src/interfaces/IUser";

import ICreateUserService from "../../src/interfaces/ICreateUserService";

describe("create user service", () => {
  describe("when execute is called", () => {
    it("should create a new user", async () => {
      const userData = {
        id: "1",
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "11/09/2001",
      } as unknown as IUser;

      const mockRepository = mock<ICreateUserService>();

      mockRepository.execute.mockReturnValue(
        userData as unknown as Promise<IUser>
      );

      expect(mockRepository.execute(userData)).toHaveProperty("id");

      expect(mockRepository.execute).toHaveBeenCalledTimes(1);
    });
  });
});
