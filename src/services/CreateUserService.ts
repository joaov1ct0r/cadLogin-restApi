import User from "../database/models/userModel";

import IUser from "../interfaces/IUser";

import bcrypt from "bcryptjs";

import ICreateUserRequest from "../interfaces/ICreateUserRequest";

import BadRequestError from "../errors/BadRequestError";

import ICreateUserService from "../interfaces/ICreateUserService";

export default class CreateUserService implements ICreateUserService {
  public async execute({
    email,
    password,
    name,
    bornAt,
  }: ICreateUserRequest): Promise<IUser> {
    const isUserRegistered: IUser | null = await User.findOne({
      where: { email },
    });

    if (isUserRegistered !== null) {
      throw new BadRequestError("Usuario já cadastrado!");
    }

    const newUser: IUser = await User.create({
      email,
      password: bcrypt.hashSync(password),
      name,
      bornAt,
    });

    return newUser;
  }
}
