import bcrypt from "bcryptjs";
import InternalError from "../errors/InternalError";
import BadRequestError from "../errors/BadRequestError";
import IAdminEditUserService from "../interfaces/IAdminEditUserService";
import { PrismaClient, User } from "@prisma/client";

export default class AdminEditUserService implements IAdminEditUserService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(
    userEmail: string,
    userNewEmail: string,
    userNewPassword: string,
    userNewName: string,
    userNewBornAt: string
  ): Promise<Object> {
    const isUserRegistered: User | null = await this.repository.user.findUnique(
      {
        where: { email: userEmail },
      }
    );

    if (isUserRegistered === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    const updatedUser: User = await this.repository.user.update({
      data: {
        email: userNewEmail,
        password: bcrypt.hashSync(userNewPassword),
        name: userNewName,
        bornAt: userNewBornAt,
      },
      where: { email: userEmail },
    });

    if (!updatedUser) {
      throw new InternalError("Falha ao atualizar usuario!");
    }

    return { message: "User editado!" };
  }
}
