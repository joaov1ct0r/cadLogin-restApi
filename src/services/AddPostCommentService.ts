import BadRequestError from "../errors/BadRequestError";
import { PrismaClient, Comment, Post, User } from "@prisma/client";
import IGetPostIdRepository from "../interfaces/IGetPostIdRepository";
import IGetUserIdRepository from "../interfaces/IGetUserIdRepository";

export default class AddPostCommentService {
  private readonly getPostIdRepository: IGetPostIdRepository;
  private readonly getUserIdRepository: IGetUserIdRepository;

  constructor(
    getPostIdRepository: IGetPostIdRepository,
    getUserIdRepository: IGetUserIdRepository
  ) {
    this.getPostIdRepository = getPostIdRepository;
    this.getUserIdRepository = getUserIdRepository;
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
