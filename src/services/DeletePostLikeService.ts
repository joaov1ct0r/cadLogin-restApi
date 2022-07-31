import ILikes from "../interfaces/ILikes";

import Post from "../database/models/postModel";

import IPost from "../interfaces/IPost";

import Likes from "../database/models/likesModel";

import { Op } from "sequelize";

import BadRequestError from "../errors/BadRequestError";

import InternalError from "../errors/InternalError";

export default class DeletePostLikeService {
  public async execute(
    userId: string | undefined,
    postId: string
  ): Promise<number> {
    const isPostRegistered: IPost | null = await Post.findOne({
      where: { id: postId },
    });

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const isLikeRegistered: ILikes | null = await Likes.findOne({
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

    const deletedLike: number = await Likes.destroy({
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
