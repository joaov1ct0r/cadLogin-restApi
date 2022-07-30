import User from "../database/models/userModel";

import IUser from "../interfaces/userInterface";

import BadRequestError from "../errors/BadRequestError";

export default class ListUserService {
  async execute(email: string): Promise<IUser> {
    const user: IUser | null = await User.findOne({
      where: { email },
    });

    if (user === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    return user;
  }
}
