import BadRequestError from "../errors/BadRequestError";
import IListUserService from "../interfaces/IListUserService";
import { PrismaClient, User } from "@prisma/client";

export default class ListUserService implements IListUserService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(email: string): Promise<User> {
    const user: User | null = await this.repository.user.findUnique({
      where: { email },
    });

    if (user === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    return user;
  }
}
