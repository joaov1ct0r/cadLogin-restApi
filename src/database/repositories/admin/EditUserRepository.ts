import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prismaClient";
import bcrypt from "bcryptjs";
import IAdminEditUserRepository from "../../../interfaces/IAdminEditUserRepository";

export default class EditUserRepository implements IAdminEditUserRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(
    email: string,
    userNewEmail: string,
    password: string,
    name: string,
    bornAt: string,
    userId?: number
  ): Promise<void> {
    await this.repository.user.update({
      data: {
        email: userNewEmail,
        password: bcrypt.hashSync(password),
        name,
        bornAt,
      },
      where: { email },
    });
  }
}
