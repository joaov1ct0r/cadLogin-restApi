import { PrismaClient, User } from "@prisma/client";
import prismaClient from "../../prismaClient";
import bcrypt from "bcryptjs";
import ICreateUserRepository from "../../../interfaces/ICreateUserRepository";

export default class CreateUserRepository implements ICreateUserRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(
    email: string,
    password: string,
    name: string,
    bornAt: string
  ): Promise<User> {
    const user: User = await this.repository.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password),
        name,
        bornAt,
        admin: false,
      },
    });

    return user;
  }
}
