import Post from "../database/models/postModel";

import IPost from "../interfaces/IPost";

import Comments from "../database/models/commentsModel";

import IComments from "../interfaces/IComments";

import BadRequestError from "../errors/BadRequestError";

import InternalError from "../errors/InternalError";

import { Op } from "sequelize";

import IDeletePostCommentService from "../interfaces/IDeletePostCommentService";

export default class DeletePostCommentService
  implements IDeletePostCommentService
{
  public async execute(
    userId: string | undefined,
    postId: string,
    commentId: string
  ): Promise<number> {
    const isPostRegistered: IPost | null = await Post.findOne({
      where: { id: postId },
    });

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const isCommentRegistered: IComments | null = await Comments.findOne({
      where: {
        [Op.and]: [
          {
            postId,
            userId,
            id: commentId,
          },
        ],
      },
    });

    if (isCommentRegistered === null) {
      throw new BadRequestError("Comentario não encontrado!");
    }

    const deletedComment: number = await Comments.destroy({
      where: {
        [Op.and]: [
          {
            postId,
            userId,
            id: commentId,
          },
        ],
      },
    });

    if (deletedComment === 0) {
      throw new InternalError("Falha ao deletar comentario!");
    }

    return Number(deletedComment);
  }
}
