import bcrypt from "bcryptjs";
import ICreateUserRequest from "../interfaces/ICreateUserRequest";
import BadRequestError from "../errors/BadRequestError";
import ICreateUserService from "../interfaces/ICreateUserService";
import { PrismaClient, User } from "@prisma/client";

export default class CreateUserService implements ICreateUserService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute({
    email,
    password,
    name,
    bornAt,
  }: ICreateUserRequest): Promise<User> {
    const isUserRegistered: User | null = await this.repository.user.findUnique(
      {
        where: {
          email,
        },
      }
    );

    if (isUserRegistered !== null) {
      throw new BadRequestError("Usuario já cadastrado!");
    }

    const newUser: User = await this.repository.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password),
        name,
        bornAt,
        admin: false,
      },
    });

    return newUser;
  }
}
