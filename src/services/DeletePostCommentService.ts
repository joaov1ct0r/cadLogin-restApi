import BadRequestError from "../errors/BadRequestError";
import { Post, Comment } from "@prisma/client";
import IGetPostIdRepository from "../interfaces/IGetPostIdRepository";
import IGetCommentRepository from "../interfaces/IGetCommentRepository";

export default class DeletePostCommentService {
  private readonly getPostIdRepository: IGetPostIdRepository;
  private readonly getCommentIdRepository: IGetCommentRepository;

  constructor(
    getPostIdRepository: IGetPostIdRepository,
    getCommentIdRepository: IGetCommentRepository
  ) {
    this.getPostIdRepository = getPostIdRepository;
    this.getCommentIdRepository = getCommentIdRepository;
  }

  public async execute(
    userId: number,
    postId: number,
    commentId: number
  ): Promise<void> {
    const isPostRegistered: Post | null =
      await this.getPostIdRepository.execute(undefined, postId);

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const isCommentRegistered: Comment | null =
      await this.getCommentIdRepository.execute(commentId, postId, userId);

    if (isCommentRegistered === null) {
      throw new BadRequestError("Comentario não encontrado!");
    }

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
