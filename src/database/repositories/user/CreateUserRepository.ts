import { PrismaClient, User } from "@prisma/client";
import prismaClient from "../../prismaClient";
import bcrypt from "bcryptjs";

interface ICreateUserRepository {
  execute(
    email: string,
    password: string,
    name: string,
    bonrAt: string
  ): Promise<User | null>;
}

export default class CreateUserRepository implements ICreateUserRepository {
  public readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(
    email: string,
    password: string,
    name: string,
    bornAt: string
  ): Promise<User | null> {
    const user: User | null = await this.repository.user.create({
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
