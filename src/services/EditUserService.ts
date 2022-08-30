import User from "../database/models/userModel";

import IEditUserRequest from "../interfaces/IEditUserRequest";

import InternalError from "../errors/InternalError";

import bcrypt from "bcryptjs";

import IEditUserService from "../interfaces/IEditUserService";

import { ModelStatic } from "sequelize";

import IUser from "../interfaces/IUser";

export default class EditUserService implements IEditUserService {
  private readonly repository: ModelStatic<IUser>;

  constructor(repository: typeof User) {
    this.repository = repository;
  }

  public async execute({
    email,
    password,
    name,
    bornAt,
    id,
  }: IEditUserRequest): Promise<number> {
    const editedUser: [affectedCount: number] = await this.repository.update(
      {
        email,
        password: bcrypt.hashSync(password),
        name,
        bornAt,
      },
      {
        where: { id },
      }
    );

    if (editedUser[0] === 0) {
      throw new InternalError("Falha ao atualizar usuario!");
    }

    return Number(editedUser);
  }
}
