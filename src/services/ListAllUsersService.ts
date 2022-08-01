import User from "../database/models/userModel";

import IUser from "../interfaces/IUser";

import Post from "../database/models/postModel";

export default class ListAllUsersService {
  public async execute(): Promise<IUser[]> {
    const users: IUser[] = await User.findAll({
      include: Post,
    });

    return users;
  }
}
