import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prismaClient";
import IDeleteCommentRepository from "../../../interfaces/IDeleteCommentRepository";

export default class DeleteCommentRepository
  implements IDeleteCommentRepository
{
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(
    commentId: number,
    postId: number,
    userId: number
  ): Promise<void> {
    await this.repository.comment.deleteMany({
      where: {
        id: commentId,
        AND: {
          postId,
          userId,
        },
      },
    });
  }
}
