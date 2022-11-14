import { mockDeep } from "jest-mock-extended";
import AdminEditUserService from "../../../src/services/AdminEditUserService";
import BadRequestError from "../../../src/errors/BadRequestError";
import { PrismaClient } from "@prisma/client";

const makeSut = () => {
  const prismaSpyRepository = mockDeep<PrismaClient>();

  const sut: AdminEditUserService = new AdminEditUserService(
    prismaSpyRepository
  );

  return { sut, prismaSpyRepository };
};

describe("admin edit user service", () => {
  describe("when execute is called", () => {
    it("should throw an exception if user is null", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.user.findUnique.mockResolvedValueOnce(null);

      expect(async () => {
        await sut.execute(
          "any@mail.com.br",
          "any_new@mail.com.br",
          "789789789",
          "user new name",
          "02/09/2001"
        );
      }).rejects.toThrow(new BadRequestError("Usuario não encontrado!"));
    });

    it("should return object when editing user", async () => {
      const { sut, prismaSpyRepository } = makeSut();

      prismaSpyRepository.user.findUnique.mockResolvedValueOnce({
        id: 1,
        email: "any@mail.com.br",
        password: "123123123",
        name: "user name",
        bornAt: "01/09/2001",
        admin: false,
      });

      prismaSpyRepository.user.update.mockResolvedValueOnce({
        id: 1,
        email: "any_new@mail.com.br",
        password: "789789789",
        name: "user new name",
        bornAt: "02/09/2001",
        admin: false,
      });

      const editedLines = await sut.execute(
        "any@mail.com.br",
        "any_new@mail.com.br",
        "789789789",
        "user new name",
        "02/09/2001"
      );

      expect(editedLines).toHaveProperty("message");

      expect(editedLines).toEqual({ message: "User editado!" });
    });
  });
});
