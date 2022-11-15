import IDeleteUserService from "../interfaces/IDeleteUserService";
import { PrismaClient } from "@prisma/client";

export default class DeleteUserService implements IDeleteUserService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(id: number | undefined): Promise<Object> {
    await this.repository.user.delete({
      where: { id },
    });

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

    return { message: "Deletado" };
  }
}
