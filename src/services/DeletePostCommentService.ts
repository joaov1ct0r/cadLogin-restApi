import BadRequestError from "../errors/BadRequestError";
import { Post, Comment } from "@prisma/client";
import IGetPostIdRepository from "../interfaces/IGetPostIdRepository";
import IGetCommentRepository from "../interfaces/IGetCommentRepository";
import IDeleteCommentRepository from "../interfaces/IDeleteCommentRepository";

export default class DeletePostCommentService {
  private readonly getPostIdRepository: IGetPostIdRepository;
  private readonly getCommentIdRepository: IGetCommentRepository;
  private readonly deleteCommentRepository: IDeleteCommentRepository;

  constructor(
    getPostIdRepository: IGetPostIdRepository,
    getCommentIdRepository: IGetCommentRepository,
    deleteCommentRepository: IDeleteCommentRepository
  ) {
    this.getPostIdRepository = getPostIdRepository;
    this.getCommentIdRepository = getCommentIdRepository;
    this.deleteCommentRepository = deleteCommentRepository;
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

    await this.deleteCommentRepository.execute(commentId, postId, userId);
  }
}
