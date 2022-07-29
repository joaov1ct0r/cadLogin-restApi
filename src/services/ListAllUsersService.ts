import User from "../database/models/userModel";

import IUser from "../interfaces/userInterface";

import Post from "../database/models/postModel";

export default class ListAllUsersService {
  async execute(): Promise<IUser[]> {
    try {
      const users: IUser[] = await User.findAll({
        include: Post,
      });

      return users;
    } catch (err: unknown) {
      throw new Error("Erro Interno!");
    }
  }
}
