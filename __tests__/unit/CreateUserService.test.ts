import { mock } from "jest-mock-extended";

import IUser from "../../src/interfaces/IUser";

import ICreateUserService from "../../src/interfaces/ICreateUserService";

describe("create user service", () => {
  describe("when execute is called", () => {
    it("should create a new user", async () => {
      const userInputData = {
        email: "user@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "11/09/2001",
      };

      const id = {
        id: "1",
      };

      const returnedData = { ...userInputData, ...id };

      const mockRepository = mock<ICreateUserService>();

      mockRepository.execute.mockReturnValue(
        returnedData as unknown as Promise<IUser>
      );

      expect(mockRepository.execute(userInputData)).toHaveProperty("id");

      expect(mockRepository.execute).toHaveBeenCalledTimes(1);
    });
  });
});
