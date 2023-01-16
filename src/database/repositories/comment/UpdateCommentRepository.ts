import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prismaClient";
import IUpdateCommentRepository from "../../../interfaces/IUpdateCommentRepository";

export default class UpdateCommentRepository
  implements IUpdateCommentRepository
{
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(
    comment: string,
    author: string,
    userId: number,
    postId: number,
    commentId: number
  ): Promise<void> {
    await this.repository.comment.updateMany({
      data: {
        comment,
        author,
        userId,
        postId,
      },
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
