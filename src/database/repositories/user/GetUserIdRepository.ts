import prismaClient from "../../prismaClient";
import { PrismaClient, User } from "@prisma/client";

interface IGetUserIdRepository {
  execute(id: number): Promise<User | null>;
}

export default class GetUserIdRepository implements IGetUserIdRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(id: number): Promise<User | null> {
    const user: User | null = await this.repository.user.findUnique({
      where: { id },
    });

    return user;
  }
}
