import BadRequestError from "../errors/BadRequestError";
import { User } from "@prisma/client";
import IGetUserEmailRepository from "../interfaces/IGetUserEmailRepository";
import AdminDeleteUserRepository from "../database/repositories/admin/DeleteUserRepository";

export default class AdminDeleteUserService {
  private readonly getUserEmailRepository: IGetUserEmailRepository;
  private readonly deleteUserRepository: AdminDeleteUserRepository;

  constructor(
    getUserEmailRepository: IGetUserEmailRepository,
    deleteUserRepository: AdminDeleteUserRepository
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
