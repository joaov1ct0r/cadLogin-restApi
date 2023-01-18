import { PrismaClient, User } from "@prisma/client";
import prismaClient from "../../prismaClient";
import IAdminDeleteUserRepository from "../../../interfaces/IAdminDeleteUserRepository";

export default class AdminDeleteUserRepository
  implements IAdminDeleteUserRepository
{
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(user: User): Promise<void> {
    await this.repository.user.delete({
      where: {
        email: user.email,
      },
    });

    await this.repository.post.deleteMany({
      where: { userId: user.id },
    });

    await this.repository.likes.deleteMany({
      where: { userId: user.id },
    });

    await this.repository.comment.deleteMany({
      where: { userId: user.id },
    });
  }
}
