import InternalError from "../errors/InternalError";

import IDeleteUserService from "../interfaces/IDeleteUserService";

import { ModelStatic } from "sequelize";

import IUser from "../interfaces/IUser";

import IPost from "../interfaces/IPost";

export default class DeleteUserService implements IDeleteUserService {
  private readonly repository: ModelStatic<IUser>;

  private readonly postRepository: ModelStatic<IPost>;

  constructor(
    repository: ModelStatic<IUser>,
    postRepository: ModelStatic<IPost>
  ) {
    this.repository = repository;

    this.postRepository = postRepository;
  }

  public async execute(id: string | undefined): Promise<number> {
    const deletedUser: number = await this.repository.destroy({
      where: { id },
    });

    if (deletedUser === 0) {
      throw new InternalError("Falha ao deletar usuario!");
    }

    this.postRepository.destroy({
      where: { userId: id },
    });

    return deletedUser;
  }
}
