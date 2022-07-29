import User from "../database/models/userModel";

import IUser from "../interfaces/userInterface";

export default class ListUserService {
  async execute(email: string): Promise<IUser | null> {
    try {
      const user: IUser | null = await User.findOne({
        where: { email },
      });

      return user;
    } catch (err: unknown) {
      throw new Error("Erro Interno!");
    }
  }
}
