import { User } from "@prisma/client";
import IEditUserRepository from "../interfaces/IEditUserRepository";

export default class EditUserService {
  private readonly repository: IEditUserRepository;

  constructor(repository: IEditUserRepository) {
    this.repository = repository;
  }

  public async execute(
    email: string,
    password: string,
    name: string,
    bornAt: string,
    userId?: number
  ): Promise<User> {
    const editedUser: User = await this.repository.execute(
      email,
      password,
      name,
      bornAt,
      userId
    );

    return editedUser;
  }
}
