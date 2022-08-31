import IUser from "../interfaces/IUser";

import BadRequestError from "../errors/BadRequestError";

import IListUserService from "../interfaces/IListUserService";
import { ModelStatic } from "sequelize";

export default class ListUserService implements IListUserService {
  private readonly repository: ModelStatic<IUser>;

  constructor(repository: ModelStatic<IUser>) {
    this.repository = repository;
  }

  public async execute(email: string): Promise<IUser> {
    const user: IUser | null = await this.repository.findOne({
      where: { email },
    });

    if (user === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    return user;
  }
}
