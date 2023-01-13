import { PrismaClient, User } from "@prisma/client";
import prismaClient from "../../prismaClient";
import bcrypt from "bcryptjs";
import IEditUserRepository from "../../../interfaces/IEditUserRepository";

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
