import User from "../database/models/userModel";

import IUser from "../interfaces/IUser";

import bcrypt from "bcryptjs";

import InternalError from "../errors/InternalError";

import BadRequestError from "../errors/BadRequestError";

export default class AdminEditUserService {
  public async execute(
    userEmail: string,
    userNewEmail: string,
    userNewPassword: string,
    userNewName: string,
    userNewBornAt: string
  ): Promise<number> {
    const isUserRegistered: IUser | null = await User.findOne({
      where: { email: userEmail },
    });

    if (isUserRegistered === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    const updatedUser: [affectedCount: number] = await User.update(
      {
        email: userNewEmail,
        password: bcrypt.hashSync(userNewPassword),
        name: userNewName,
        bornAt: userNewBornAt,
      },
      {
        where: { email: userEmail },
      }
    );

    if (updatedUser[0] === 0) {
      throw new InternalError("Falha ao atualizar usuario!");
    }

    return Number(updatedUser);
  }
}
