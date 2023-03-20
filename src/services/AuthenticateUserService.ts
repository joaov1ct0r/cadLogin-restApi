import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BadRequestError from "../errors/BadRequestError";
import UnathorizedError from "../errors/UnauthorizedError";
import { User } from "@prisma/client";
import IGetUserEmailRepository from "../interfaces/IGetUserEmailRepository";

export default class AuthenticateUserService {
  private readonly repository: IGetUserEmailRepository;

  constructor(repository: IGetUserEmailRepository) {
    this.repository = repository;
  }

  public async execute(email: string, password: string) {
    const isUserRegistered: User | null = await this.repository.execute(email);

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
