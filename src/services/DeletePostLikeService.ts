import ILikes from "../interfaces/ILikes";

import IPost from "../interfaces/IPost";

import { ModelStatic, Op } from "sequelize";

import BadRequestError from "../errors/BadRequestError";

import InternalError from "../errors/InternalError";

import IDeletePostLikeService from "../interfaces/IDeletePostLikeService";

export default class DeletePostLikeService implements IDeletePostLikeService {
  private readonly repository: ModelStatic<IPost>;

  private readonly likesRepository: ModelStatic<ILikes>;

  constructor(
    repository: ModelStatic<IPost>,
    likesRepository: ModelStatic<ILikes>
  ) {
    this.repository = repository;

    this.likesRepository = likesRepository;
  }

  public async execute(
    userId: string | undefined,
    postId: string
  ): Promise<number> {
    const isPostRegistered: IPost | null = await this.repository.findOne({
      where: { id: postId },
    });

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const isLikeRegistered: ILikes | null = await this.likesRepository.findOne({
      where: {
        [Op.and]: [
          {
            postId,
            userId,
          },
        ],
      },
    });

    if (isLikeRegistered === null) {
      throw new BadRequestError("Like não encontrado!");
    }

    const deletedLike: number = await this.likesRepository.destroy({
      where: {
        [Op.and]: [
          {
            postId,
            userId,
          },
        ],
      },
    });

    if (deletedLike === 0) {
      throw new InternalError("Falha ao deletar Like!");
    }

    return Number(deletedLike);
  }
}
