import IUser from "../interfaces/IUser";

import bcrypt from "bcryptjs";

import ICreateUserRequest from "../interfaces/ICreateUserRequest";

import BadRequestError from "../errors/BadRequestError";

import ICreateUserService from "../interfaces/ICreateUserService";

import { ModelStatic } from "sequelize";

export default class CreateUserService implements ICreateUserService {
  private readonly repository: ModelStatic<IUser>;

  constructor(repository: ModelStatic<IUser>) {
    this.repository = repository;
  }

  public async execute({
    email,
    password,
    name,
    bornAt,
  }: ICreateUserRequest): Promise<IUser> {
    const isUserRegistered: IUser | null = await this.repository.findOne({
      where: { email },
    });

    if (isUserRegistered !== null) {
      throw new BadRequestError("Usuario já cadastrado!");
    }

    const newUser: IUser = await this.repository.create({
      email,
      password: bcrypt.hashSync(password),
      name,
      bornAt,
    });

    return newUser;
  }
}
