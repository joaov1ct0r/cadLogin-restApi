import BadRequestError from "../errors/BadRequestError";
import IAddPostCommentService from "../interfaces/IAddPostCommentService";
import { PrismaClient, Comment, Post, User } from "@prisma/client";

export default class AddPostCommentService implements IAddPostCommentService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(
    id: number,
    postId: number,
    comment: string
  ): Promise<Comment> {
    const isPostRegistered: Post | null = await this.repository.post.findUnique(
      {
        where: { id: postId },
      }
    );

    if (isPostRegistered === null)
      throw new BadRequestError("Post não encontrado!");

    const user: User | null = await this.repository.user.findUnique({
      where: { id },
    });

    if (user === null) throw new BadRequestError("User não encontrado!");

    const createdComment: Comment = await this.repository.comment.create({
      data: {
        author: user.email,
        userId: user.id,
        comment,
        postId,
      },
    });

    return createdComment;
  }
}
