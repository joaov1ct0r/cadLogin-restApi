import IEditUserRequest from "../interfaces/IEditUserRequest";
import bcrypt from "bcryptjs";
import IEditUserService from "../interfaces/IEditUserService";
import { PrismaClient, User } from "@prisma/client";

export default class EditUserService implements IEditUserService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(
    email: string,
    password: string,
    name: string,
    bornAt: string,
    userId?: number
  ): Promise<User> {
    const editedUser: User = await this.repository.user.update({
      data: {
        email,
        password: bcrypt.hashSync(password),
        name,
        bornAt,
      },
      where: { id: userId },
    });

    return editedUser;
  }
}
