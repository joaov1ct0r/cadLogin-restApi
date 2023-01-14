import { PrismaClient, User } from "@prisma/client";
import prismaClient from "../../prismaClient";

interface ILIstUsersRepository {
  execute(): Promise<User[]>;
}

export default class ListUsersRepository implements ILIstUsersRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(): Promise<User[]> {
    const users: User[] = await this.repository.user.findMany({
      include: {
        Post: true,
        Comment: true,
        Likes: true,
      },
    });

    return users;
  }
}
