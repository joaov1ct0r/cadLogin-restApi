import User from "../database/models/userModel";

import IUser from "../interfaces/IUser";

import Post from "../database/models/postModel";

import IListAllUsersService from "../interfaces/IListAllUsersService";

export default class ListAllUsersService implements IListAllUsersService {
  public async execute(): Promise<IUser[]> {
    const users: IUser[] = await User.findAll({
      include: Post,
    });

    return users;
  }
}
