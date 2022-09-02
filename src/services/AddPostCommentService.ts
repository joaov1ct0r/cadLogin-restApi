import IComments from "../interfaces/IComments";

import IPost from "../interfaces/IPost";

import IUser from "../interfaces/IUser";

import BadRequestError from "../errors/BadRequestError";

import IAddPostCommentService from "../interfaces/IAddPostCommentService";
import { ModelStatic } from "sequelize/types";

export default class AddPostCommentService implements IAddPostCommentService {
  private readonly repository: ModelStatic<IPost>;

  private readonly commentsRepository: ModelStatic<IComments>;

  private readonly userRepository: ModelStatic<IUser>;

  constructor(
    repository: ModelStatic<IPost>,
    commentsRepository: ModelStatic<IComments>,
    userRepository: ModelStatic<IUser>
  ) {
    this.repository = repository;

    this.commentsRepository = commentsRepository;

    this.userRepository = userRepository;
  }

  public async execute(
    id: string | undefined,
    postId: string,
    comment: string
  ): Promise<IComments> {
    const isPostRegistered: IPost | null = await this.repository.findOne({
      where: { id: postId },
    });

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const user: IUser | null = await this.userRepository.findOne({
      where: { id },
    });

    const createdComment: IComments = await this.commentsRepository.create({
      author: user!.email,
      userId: user!.id,
      comment,
      postId,
    });

    return createdComment;
  }
}
