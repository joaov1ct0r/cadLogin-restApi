import "dotenv/config";

import IUser from "../interfaces/IUser";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import BadRequestError from "../errors/BadRequestError";

import UnathorizedError from "../errors/UnathorizedError";

import IAuthenticateUserService from "../interfaces/IAuthenticateUserService";

import { ModelStatic } from "sequelize";

export default class AuthenticateUserService
  implements IAuthenticateUserService
{
  private readonly repository: ModelStatic<IUser>;
  constructor(repository: ModelStatic<IUser>) {
    this.repository = repository;
  }

  public async execute(email: string, password: string) {
    const isUserRegistered: IUser | null = await this.repository.findOne({
      where: { email },
    });

    if (isUserRegistered === null) {
      throw new BadRequestError("Usuario não registrado!");
    }

    const matchingPasswords: boolean = bcrypt.compareSync(
      password,
      isUserRegistered.password
    );

    if (matchingPasswords === false) {
      throw new UnathorizedError("Falha na autenticação!");
    }

    const token: string = jwt.sign(
      { id: isUserRegistered.id, admin: isUserRegistered.admin },
      process.env.JWT_TOKEN_SECRET as string,
      { expiresIn: 300 }
    );

    return token;
  }
}
