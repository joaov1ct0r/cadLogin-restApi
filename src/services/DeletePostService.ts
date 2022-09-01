import IPost from "../interfaces/IPost";

import { ModelStatic, Op } from "sequelize";

import BadRequestError from "../errors/BadRequestError";

import InternalError from "../errors/InternalError";

import IDeletePostService from "../interfaces/IDeletePostService";

import ILikes from "../interfaces/ILikes";

import IComments from "../interfaces/IComments";

export default class DeletePostService implements IDeletePostService {
  private readonly repository: ModelStatic<IPost>;

  private readonly commentsRepository: ModelStatic<IComments>;

  private readonly likesRepository: ModelStatic<ILikes>;

  constructor(
    repository: ModelStatic<IPost>,
    commentsRepository: ModelStatic<IComments>,
    likesRepository: ModelStatic<ILikes>
  ) {
    this.repository = repository;

    this.commentsRepository = commentsRepository;

    this.likesRepository = likesRepository;
  }

  public async execute(
    id: string | undefined,
    postId: string
  ): Promise<number> {
    const isPostRegistered: IPost | null = await this.repository.findOne({
      where: {
        [Op.and]: [
          {
            id: postId,
            userId: id,
          },
        ],
      },
    });

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    // eslint-disable-next-line no-unused-vars
    const deletedPost: number = await this.repository.destroy({
      where: {
        [Op.and]: [
          {
            id: postId,
            userId: id,
          },
        ],
      },
    });

    if (deletedPost === 0) {
      throw new InternalError("Falha ao deletar post!");
    }

    // eslint-disable-next-line no-unused-vars
    const deletedLikes: number = await this.likesRepository.destroy({
      where: { postId },
    });

    // eslint-disable-next-line no-unused-vars
    const deletedComments: number = await this.commentsRepository.destroy({
      where: { postId },
    });

    return Number(deletedPost);
  }
}
