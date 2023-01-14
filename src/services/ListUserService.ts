import BadRequestError from "../errors/BadRequestError";
import { User } from "@prisma/client";
import IGetUserEmailRepository from "../interfaces/IGetUserEmailRepository";

export default class ListUserService {
  private readonly repository: IGetUserEmailRepository;

  constructor(repository: IGetUserEmailRepository) {
    this.repository = repository;
  }

  public async execute(email: string): Promise<User> {
    const user: User | null = await this.repository.execute(email);

    if (user === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    return user;
  }
}
