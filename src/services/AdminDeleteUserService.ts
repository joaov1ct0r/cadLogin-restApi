import IUser from "../interfaces/IUser";

import BadRequestError from "../errors/BadRequestError";

import InternalError from "../errors/InternalError";

import IAdminDeleteUserService from "../interfaces/IAdminDeleteUserService";

import { ModelStatic } from "sequelize/types";

import IPost from "../interfaces/IPost";

export default class AdminDeleteUserService implements IAdminDeleteUserService {
  private readonly repository: ModelStatic<IUser>;

  private readonly postRepository: ModelStatic<IPost>;

  constructor(
    repository: ModelStatic<IUser>,
    postRepository: ModelStatic<IPost>
  ) {
    this.repository = repository;

    this.postRepository = postRepository;
  }

  public async execute(userEmail: string): Promise<number> {
    const isUserRegistered: IUser | null = await this.repository.findOne({
      where: { email: userEmail },
    });

    if (isUserRegistered === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    const deletedUser: number = await this.repository.destroy({
      where: {
        email: userEmail,
      },
    });

    if (deletedUser === 0) {
      throw new InternalError("Falha ao deletar usuario!");
    }

    // eslint-disable-next-line no-unused-vars
    const deletedPost: number = await this.postRepository.destroy({
      where: { userId: isUserRegistered.id },
    });

    return Number(deletedUser);
  }
}
