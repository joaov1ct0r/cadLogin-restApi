import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prismaClient";
import IDeletePostRepository from "../../../interfaces/IDeletePostRepository";

export default class DeletePostRepository implements IDeletePostRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(postId: number, id: number): Promise<void> {
    await this.repository.post.deleteMany({
      where: {
        id: postId,
        AND: {
          userId: id,
        },
      },
    });

    await this.repository.likes.deleteMany({
      where: {
        postId,
        AND: {
          userId: id,
        },
      },
    });

    await this.repository.comment.deleteMany({
      where: {
        postId,
        AND: {
          userId: id,
        },
      },
    });
  }
}
