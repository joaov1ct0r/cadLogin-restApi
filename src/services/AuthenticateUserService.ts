import User from "../database/models/userModel";

import IUser from "../interfaces/userInterface";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import BadRequestError from "../errors/BadRequestError";

import UnathorizedError from "../errors/UnathorizedError";

export default class AuthenticateUserService {
  async execute(email: string, password: string) {
    const isUserRegistered: IUser | null = await User.findOne({
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
