import CreateUserService from "../../src/services/CreateUserService";

import User from "../../src/database/models/userModel";

import BadRequestError from "../../src/errors/BadRequestError";

const makeSut = () => {
  return new CreateUserService(User);
};

describe("when create user service is called", () => {
  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  describe("execute", () => {
    it("should return an error if user already exists", async () => {
      const sut = makeSut();

      const userData = {
        email: "user@email.com.br",
        password: "123123123123",
        name: "user name",
        bornAt: "11/09/2001",
      };

      mockRepository.findOne.mockReturnValue(userData);

      await sut.execute(userData);

      const user = await sut.execute(userData);

      expect(user).toBe(typeof BadRequestError);
      expect(sut).toHaveBeenCalledTimes(2);
    });
  });
});
