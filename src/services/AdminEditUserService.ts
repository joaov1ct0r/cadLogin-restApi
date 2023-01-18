import BadRequestError from "../errors/BadRequestError";
import { User } from "@prisma/client";
import IGetUserEmailRepository from "../interfaces/IGetUserEmailRepository";
import IAdminEditUserRepository from "../interfaces/IAdminEditUserRepository";

export default class AdminEditUserService {
  private readonly getUserEmailRepository: IGetUserEmailRepository;
  private readonly editUserRepository: IAdminEditUserRepository;

  constructor(
    getUserEmailRepository: IGetUserEmailRepository,
    editUserRepository: IAdminEditUserRepository
  ) {
    this.getUserEmailRepository = getUserEmailRepository;
    this.editUserRepository = editUserRepository;
  }

  public async execute(
    userEmail: string,
    userNewEmail: string,
    userNewPassword: string,
    userNewName: string,
    userNewBornAt: string
  ): Promise<void> {
    const isUserRegistered: User | null =
      await this.getUserEmailRepository.execute(userEmail);

    if (isUserRegistered === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    await this.editUserRepository.execute(
      isUserRegistered.email,
      userNewEmail,
      userNewPassword,
      userNewName,
      userNewBornAt
    );
  }
}
