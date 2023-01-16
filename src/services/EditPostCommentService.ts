import BadRequestError from "../errors/BadRequestError";
import IEditPostCommentService from "../interfaces/IEditPostCommentService";
import { Comment, Post, User } from "@prisma/client";
import IGetPostIdRepository from "../interfaces/IGetPostIdRepository";
import IGetCommentRepository from "../interfaces/IGetCommentRepository";
import IGetUserIdRepository from "../interfaces/IGetUserIdRepository";

export default class EditPostCommentService implements IEditPostCommentService {
  private readonly getPostIdRepository: IGetPostIdRepository;
  private readonly getCommentRepository: IGetCommentRepository;
  private readonly getUserIdRepository: IGetUserIdRepository;

  constructor(
    getPostIdRepository: IGetPostIdRepository,
    getCommentRepository: IGetCommentRepository,
    getUserIdRepository: IGetUserIdRepository
  ) {
    this.getPostIdRepository = getPostIdRepository;
    this.getCommentRepository = getCommentRepository;
    this.getUserIdRepository = getUserIdRepository;
  }

  public async execute(
    userId: number,
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
      await this.getCommentRepository.execute(commentId, postId, userId);

    if (isCommentRegistered === null) {
      throw new BadRequestError("Comentario não encontrado!");
    }

    const user: User | null = await this.getUserIdRepository.execute(userId);

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
