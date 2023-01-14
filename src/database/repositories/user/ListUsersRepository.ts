import { PrismaClient, User } from "@prisma/client";
import prismaClient from "../../prismaClient";
import IListUsersRepository from "../../../interfaces/IListUsersRepository";

export default class ListUsersRepository implements IListUsersRepository {
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
