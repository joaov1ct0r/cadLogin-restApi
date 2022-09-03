import IUser from "../interfaces/IUser";

import bcrypt from "bcryptjs";

import InternalError from "../errors/InternalError";

import BadRequestError from "../errors/BadRequestError";

import IAdminEditUserService from "../interfaces/IAdminEditUserService";

import { ModelStatic } from "sequelize";

export default class AdminEditUserService implements IAdminEditUserService {
  private readonly repository: ModelStatic<IUser>;

  constructor(repository: ModelStatic<IUser>) {
    this.repository = repository;
  }

  public async execute(
    userEmail: string,
    userNewEmail: string,
    userNewPassword: string,
    userNewName: string,
    userNewBornAt: string
  ): Promise<number> {
    const isUserRegistered: IUser | null = await this.repository.findOne({
      where: { email: userEmail },
    });

    if (isUserRegistered === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    const updatedUser: [affectedCount: number] = await this.repository.update(
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
