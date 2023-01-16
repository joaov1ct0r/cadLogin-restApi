import { Comment, PrismaClient } from "@prisma/client";
import prismaClient from "../../prismaClient";
import IGetCommentRepository from "../../../interfaces/IGetCommentRepository";

export default class GetCommentRepository implements IGetCommentRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(
    commentId: number,
    postId: number,
    userId?: number
  ): Promise<Comment | null> {
    if (userId === undefined) {
      const isCommentRegistered: Comment | null =
        await this.repository.comment.findFirst({
          where: {
            id: commentId,
            AND: {
              postId,
            },
          },
        });

      return isCommentRegistered;
    } else {
      const isCommentRegistered: Comment | null =
        await this.repository.comment.findFirst({
          where: {
            id: commentId,
            AND: {
              postId,
              userId,
            },
          },
        });

      return isCommentRegistered;
    }
  }
}
