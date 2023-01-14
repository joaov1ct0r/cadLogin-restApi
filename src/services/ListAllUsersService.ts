import { User } from "@prisma/client";
import IListUsersRepository from "../interfaces/IListUsersRepository";

export default class ListAllUsersService {
  private readonly repository: IListUsersRepository;

  constructor(repository: IListUsersRepository) {
    this.repository = repository;
  }

  public async execute(): Promise<User[]> {
    const users: User[] = await this.repository.execute();

    return users;
  }
}
