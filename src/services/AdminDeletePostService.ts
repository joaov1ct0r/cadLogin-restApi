import IPost from "../interfaces/IPost";

import BadRequestError from "../errors/BadRequestError";

import InternalError from "../errors/InternalError";

import IAdminDeletePostService from "../interfaces/IAdminDeletePostService";

import { ModelStatic } from "sequelize";

export default class AdminDeletePostService implements IAdminDeletePostService {
  private readonly repository: ModelStatic<IPost>;

  constructor(repository: ModelStatic<IPost>) {
    this.repository = repository;
  }

  public async execute(postId: string): Promise<number> {
    const isPostRegistered: IPost | null = await this.repository.findOne({
      where: {
        id: postId,
      },
    });

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const deletedPost: number = await this.repository.destroy({
      where: { id: postId },
    });

    if (deletedPost === 0) {
      throw new InternalError("Falha ao deletar Post!");
    }

    return Number(deletedPost);
  }
}
