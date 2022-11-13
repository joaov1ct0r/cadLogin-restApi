import BadRequestError from "../errors/BadRequestError";
import InternalError from "../errors/InternalError";
import { PrismaClient, Post, Comment } from "@prisma/client";
import IDeletePostCommentService from "../interfaces/IDeletePostCommentService";

export default class DeletePostCommentService
  implements IDeletePostCommentService
{
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(
    userId: number | undefined,
    postId: number,
    commentId: number
  ): Promise<Object> {
    const isPostRegistered: Post | null = await this.repository.post.findUnique(
      {
        where: { id: postId },
      }
    );

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

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

    if (isCommentRegistered === null) {
      throw new BadRequestError("Comentario não encontrado!");
    }

    const deletedComment = await this.repository.comment.deleteMany({
      where: {
        id: commentId,
        AND: {
          postId,
          userId,
        },
      },
    });

    if (!deletedComment) {
      throw new InternalError("Falha ao deletar comentario!");
    }

    return { message: "Comment deletado!" };
  }
}
