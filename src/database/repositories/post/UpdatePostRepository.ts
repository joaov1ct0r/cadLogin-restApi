import prismaClient from "../../prismaClient";
import { PrismaClient } from "@prisma/client";
import IUpdatePostRepository from "../../../interfaces/IUpdatePostRepository";

export default class UpdatePostRepository implements IUpdatePostRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(content: string, id: number, postId: number): Promise<void> {
    await this.repository.post.updateMany({
      data: {
        content,
      },
      where: {
        id: postId,
        AND: {
          userId: id,
        },
      },
    });
  }
}
