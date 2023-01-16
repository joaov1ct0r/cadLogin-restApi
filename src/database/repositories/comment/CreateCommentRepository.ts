import { Comment, PrismaClient } from "@prisma/client";
import prismaClient from "../../prismaClient";
import ICreateCommentRepository from "../../../interfaces/ICreateCommentRepository";

export default class CreateCommentRepository
  implements ICreateCommentRepository
{
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(
    author: string,
    userId: number,
    comment: string,
    postId: number
  ): Promise<Comment> {
    const createdComment: Comment = await this.repository.comment.create({
      data: {
        author,
        userId,
        comment,
        postId,
      },
    });

    return createdComment;
  }
}
