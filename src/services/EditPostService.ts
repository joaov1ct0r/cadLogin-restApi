import IPost from "../interfaces/IPost";

import { ModelStatic, Op } from "sequelize";

import BadRequestError from "../errors/BadRequestError";

import InternalError from "../errors/InternalError";

import IEditPostService from "../interfaces/IEditPostService";

export default class EditPostService implements IEditPostService {
  private readonly repository: ModelStatic<IPost>;

  constructor(repository: ModelStatic<IPost>) {
    this.repository = repository;
  }

  public async execute(
    id: string | undefined,
    postId: string,
    content: string
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

    const editedPost: [affectedCount: number] = await this.repository.update(
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
