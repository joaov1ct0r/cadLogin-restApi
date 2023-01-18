import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prismaClient";
import IAdminDeletePostRepository from "../../../interfaces/IAdminDeletePostRepository";

export default class DeletePostRepository
  implements IAdminDeletePostRepository
{
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(postId: number): Promise<void> {
    await this.repository.post.delete({
      where: { id: postId },
    });
  }
}
