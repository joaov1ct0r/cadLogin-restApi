import { User, PrismaClient } from "@prisma/client";
import IListAllUsersService from "../interfaces/IListAllUsersService";

export default class ListAllUsersService implements IListAllUsersService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(): Promise<User[]> {
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
