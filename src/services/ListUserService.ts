import User from "../database/models/userModel";

import IUser from "../interfaces/IUser";

import BadRequestError from "../errors/BadRequestError";

import IListUserService from "../interfaces/IListUserService";

export default class ListUserService implements IListUserService {
  public async execute(email: string): Promise<IUser> {
    const user: IUser | null = await User.findOne({
      where: { email },
    });

    if (user === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    return user;
  }
}
