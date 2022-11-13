import InternalError from "../errors/InternalError";
import IDeleteUserService from "../interfaces/IDeleteUserService";
import { PrismaClient, User } from "@prisma/client";

export default class DeleteUserService implements IDeleteUserService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(id: number | undefined): Promise<User> {
    const deletedUser: User = await this.repository.user.delete({
      where: { id },
    });

    if (!deletedUser) {
      throw new InternalError("Falha ao deletar usuario!");
    }

    await this.repository.post.deleteMany({
      where: { userId: id },
    });

    await this.repository.likes.deleteMany({
      where: {
        userId: id,
      },
    });

    await this.repository.comment.deleteMany({
      where: {
        userId: id,
      },
    });

    return deletedUser;
  }
}
