import Post from "../database/models/postModel";

import IPost from "../interfaces/IPost";

import BadRequestError from "../errors/BadRequestError";

import Comments from "../database/models/commentsModel";

import IComments from "../interfaces/IComments";

import { Op } from "sequelize";

import User from "../database/models/userModel";

import IUser from "../interfaces/IUser";

import InternalError from "../errors/InternalError";

import IEditPostCommentService from "../interfaces/IEditPostCommentService";

export default class EditPostCommentService implements IEditPostCommentService {
  public async execute(
    userId: string | undefined,
    postId: string,
    commentId: string,
    comment: string
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

    const user: IUser | null = await User.findOne({
      where: {
        id: userId,
      },
    });

    const updatedComment: [affectedCount: number] = await Comments.update(
      {
        comment,
        author: user!.email,
        userId,
        postId: isPostRegistered.id,
      },
      {
        where: {
          [Op.and]: [
            {
              postId,
              userId,
              id: commentId,
            },
          ],
        },
      }
    );

    if (updatedComment[0] === 0) {
      throw new InternalError("Falha ao atualizar comentario!");
    }

    return Number(updatedComment);
  }
}
