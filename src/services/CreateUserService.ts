import ICreateUserRequest from "../interfaces/ICreateUserRequest";
import BadRequestError from "../errors/BadRequestError";
import { User } from "@prisma/client";
import IGetUserEmailRepository from "../interfaces/IGetUserEmailRepository";
import ICreateUserRepository from "../interfaces/ICreateUserRepository";

export default class CreateUserService {
  private readonly getUserRepository: IGetUserEmailRepository;
  private readonly createUserRepository: ICreateUserRepository;

  constructor(
    getUserRepository: IGetUserEmailRepository,
    createUserRepository: ICreateUserRepository
  ) {
    this.getUserRepository = getUserRepository;
    this.createUserRepository = createUserRepository;
  }

  public async execute({
    email,
    password,
    name,
    bornAt,
  }: ICreateUserRequest): Promise<User> {
    const isUserRegistered: User | null = await this.getUserRepository.execute(
      email
    );

    if (isUserRegistered !== null) {
      throw new BadRequestError("Usuario já cadastrado!");
    }

    const newUser: User = await this.createUserRepository.execute(
      email,
      password,
      name,
      bornAt
    );

    return newUser;
  }
}
