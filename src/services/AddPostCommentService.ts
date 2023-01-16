import BadRequestError from "../errors/BadRequestError";
import { Comment, Post, User } from "@prisma/client";
import IGetPostIdRepository from "../interfaces/IGetPostIdRepository";
import IGetUserIdRepository from "../interfaces/IGetUserIdRepository";
import ICreateCommentRepository from "../interfaces/ICreateCommentRepository";

export default class AddPostCommentService {
  private readonly getPostIdRepository: IGetPostIdRepository;
  private readonly getUserIdRepository: IGetUserIdRepository;
  private readonly createCommentRepository: ICreateCommentRepository;

  constructor(
    getPostIdRepository: IGetPostIdRepository,
    getUserIdRepository: IGetUserIdRepository,
    createCommentRepository: ICreateCommentRepository
  ) {
    this.getPostIdRepository = getPostIdRepository;
    this.getUserIdRepository = getUserIdRepository;
    this.createCommentRepository = createCommentRepository;
  }

  public async execute(
    id: number,
    postId: number,
    comment: string
  ): Promise<Comment> {
    const isPostRegistered: Post | null =
      await this.getPostIdRepository.execute(undefined, postId);

    if (isPostRegistered === null)
      throw new BadRequestError("Post não encontrado!");

    const user: User | null = await this.getUserIdRepository.execute(id);

    if (user === null) throw new BadRequestError("User não encontrado!");

    const createdComment: Comment = await this.createCommentRepository.execute(
      user.email,
      user.id,
      comment,
      isPostRegistered.id
    );

    return createdComment;
  }
}
