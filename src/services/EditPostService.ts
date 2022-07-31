import Post from "../database/models/postModel";

import IPost from "../interfaces/IPost";

import { Op } from "sequelize";

import BadRequestError from "../errors/BadRequestError";

import InternalError from "../errors/InternalError";

export default class EditPostService {
  public async execute(
    id: string | undefined,
    postId: string,
    content: string
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

    const editedPost: [affectedCount: number] = await Post.update(
      {
        content,
      },
      {
        where: {
          [Op.and]: [
            {
              id: postId,
              userId: id,
            },
          ],
        },
      }
    );

    if (editedPost[0] === 0) {
      throw new InternalError("Falha ao atualizar Post!");
    }

    return Number(editedPost);
  }
}
