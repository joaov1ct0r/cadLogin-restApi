import Post from "../database/models/postModel";

import IPost from "../interfaces/IPost";

import { Op } from "sequelize";

import Likes from "../database/models/likesModel";

import Comments from "../database/models/commentsModel";

import BadRequestError from "../errors/BadRequestError";

import InternalError from "../errors/InternalError";

export default class DeletePostService {
  public async execute(
    id: string | undefined,
    postId: string
  ): Promise<number> {
    const isPostRegistered: IPost | null = await Post.findOne({
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
    const deletedPost: number = await Post.destroy({
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
    const deletedLikes: number = await Likes.destroy({
      where: { postId },
    });

    // eslint-disable-next-line no-unused-vars
    const deletedComments: number = await Comments.destroy({
      where: { postId },
    });

    return Number(deletedPost);
  }
}
