import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prismaClient";
import IDeletePostRepository from "../../../interfaces/IAdminDeletePostRepository";

export default class DeletePostRepository implements IDeletePostRepository {
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
