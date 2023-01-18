import BadRequestError from "../errors/BadRequestError";
import { User } from "@prisma/client";
import IGetUserEmailRepository from "../interfaces/IGetUserEmailRepository";
import DeleteUserRepository from "../database/repositories/user/DeleteUserRepository";

export default class AdminDeleteUserService {
  private readonly getUserEmailRepository: IGetUserEmailRepository;
  private readonly deleteUserRepository: DeleteUserRepository;

  constructor(
    getUserEmailRepository: IGetUserEmailRepository,
    deleteUserRepository: DeleteUserRepository
  ) {
    this.getUserEmailRepository = getUserEmailRepository;
    this.deleteUserRepository = deleteUserRepository;
  }

  public async execute(userEmail: string): Promise<void> {
    const isUserRegistered: User | null =
      await this.getUserEmailRepository.execute(userEmail);

    if (isUserRegistered === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    await this.deleteUserRepository.execute(isUserRegistered);
  }
}
