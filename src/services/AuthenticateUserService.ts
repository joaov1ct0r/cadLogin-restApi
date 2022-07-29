import User from "../database/models/userModel";

import IUser from "../interfaces/userInterface";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export default class AuthenticateUserService {
  async execute(email: string, password: string) {
    try {
      const isUserRegistered: IUser | null = await User.findOne({
        where: { email },
      });

      if (isUserRegistered === null) {
        throw new Error("Usuario não registrado!");
      }

      const matchingPasswords: boolean = bcrypt.compareSync(
        password,
        isUserRegistered.password
      );

      if (matchingPasswords === false) {
        throw new Error("Falha na autenticação!");
      }

      const token: string = jwt.sign(
        { id: isUserRegistered.id, admin: isUserRegistered.admin },
        process.env.JWT_TOKEN_SECRET as string,
        { expiresIn: 300 }
      );

      return token;
    } catch (err: unknown) {
      throw new Error("Erro interno!");
    }
  }
}
