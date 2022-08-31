import IUser from "../interfaces/IUser";

import Post from "../database/models/postModel";

import IListAllUsersService from "../interfaces/IListAllUsersService";

import { ModelStatic } from "sequelize";

export default class ListAllUsersService implements IListAllUsersService {
  private readonly repository: ModelStatic<IUser>;

  constructor(repository: ModelStatic<IUser>) {
    this.repository = repository;
  }

  public async execute(): Promise<IUser[]> {
    const users: IUser[] = await this.repository.findAll({
      include: Post,
    });

    return users;
  }
}
