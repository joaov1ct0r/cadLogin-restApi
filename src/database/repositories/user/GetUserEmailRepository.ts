import { PrismaClient, User } from "@prisma/client";
import prismaClient from "../../prismaClient";

interface IGetUserEmailRepository {
  execute(email: string): Promise<User | null>;
}

export default class GetUserEmailRepository implements IGetUserEmailRepository {
  public readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(email: string): Promise<User | null> {
    const user = await this.repository.user.findUnique({
      where: { email },
    });

    return user;
  }
}
