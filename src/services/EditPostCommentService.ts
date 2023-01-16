import BadRequestError from "../errors/BadRequestError";
import IEditPostCommentService from "../interfaces/IEditPostCommentService";
import { Comment, Post, User } from "@prisma/client";
import IGetPostIdRepository from "../interfaces/IGetPostIdRepository";

export default class EditPostCommentService implements IEditPostCommentService {
  private readonly getPostIdRepository: IGetPostIdRepository;

  constructor(getPostIdRepository: IGetPostIdRepository) {
    this.getPostIdRepository = getPostIdRepository;
  }

  public async execute(
    userId: number | undefined,
    postId: number,
    commentId: number,
    comment: string
  ): Promise<void> {
    const isPostRegistered: Post | null =
      await this.getPostIdRepository.execute(undefined, postId);

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
  }
}
