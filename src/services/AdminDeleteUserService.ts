import User from "../database/models/userModel";

import IUser from "../interfaces/IUser";

import BadRequestError from "../errors/BadRequestError";

import InternalError from "../errors/InternalError";

import Post from "../database/models/postModel";

import IAdminDeleteUserService from "../interfaces/IAdminDeleteUserService";

export default class AdminDeleteUserService implements IAdminDeleteUserService {
  public async execute(userEmail: string): Promise<number> {
    const isUserRegistered: IUser | null = await User.findOne({
      where: { email: userEmail },
    });

    if (isUserRegistered === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    const deletedUser: number = await User.destroy({
      where: {
        email: userEmail,
      },
    });

    if (deletedUser === 0) {
      throw new InternalError("Falha ao deletar usuario!");
    }

    // eslint-disable-next-line no-unused-vars
    const deletedPost: number = await Post.destroy({
      where: { userId: isUserRegistered.id },
    });

    return Number(deletedUser);
  }
}
