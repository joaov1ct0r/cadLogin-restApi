import { PrismaClient, User } from "@prisma/client";
import prismaClient from "../../prismaClient";
import bcrypt from "bcryptjs";

interface IEditUserRepository {
  execute(
    email: string,
    password: string,
    name: string,
    bornAt: string
  ): Promise<User>;
}

export default class EditUserRepository implements IEditUserRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(
    email: string,
    password: string,
    name: string,
    bornAt: string,
    userId?: number
  ): Promise<User> {
    const user = await this.repository.user.update({
      data: {
        email,
        password: bcrypt.hashSync(password),
        name,
        bornAt,
      },
      where: {
        id: userId,
      },
    });

    return user;
  }
}
