import User from "../database/models/userModel";

import Post from "../database/models/postModel";

import InternalError from "../errors/InternalError";

import IDeleteUserService from "../interfaces/IDeleteUserService";
import { ModelStatic } from "sequelize";

import IUser from "../interfaces/IUser";

export default class DeleteUserService implements IDeleteUserService {
  private readonly repository: ModelStatic<IUser>;

  constructor(repository: typeof User) {
    this.repository = repository;
  }

  public async execute(id: string | undefined): Promise<number> {
    const deletedUser: number = await this.repository.destroy({
      where: { id },
    });

    if (deletedUser === 0) {
      throw new InternalError("Falha ao deletar usuario!");
    }

    // eslint-disable-next-line no-unused-vars
    const deletedPost: number = await Post.destroy({
      where: { userId: id },
    });

    return deletedUser;
  }
}
