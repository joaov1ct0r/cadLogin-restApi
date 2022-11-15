import BadRequestError from "../errors/BadRequestError";
import IEditPostCommentService from "../interfaces/IEditPostCommentService";
import { PrismaClient, Comment, Post, User } from "@prisma/client";

export default class EditPostCommentService implements IEditPostCommentService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(
    userId: number | undefined,
    postId: number,
    commentId: number,
    comment: string
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

    const user: User | null = await this.repository.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user === null) throw new BadRequestError("User não encontrado!");

    await this.repository.comment.updateMany({
      data: {
        comment,
        author: user!.email,
        userId,
        postId: isPostRegistered.id,
      },
      where: {
        id: commentId,
        AND: {
          postId,
          userId,
        },
      },
    });

    return { message: "Comment atualizado" };
  }
}
