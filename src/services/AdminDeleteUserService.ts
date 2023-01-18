import BadRequestError from "../errors/BadRequestError";
import { User } from "@prisma/client";
import IGetUserEmailRepository from "../interfaces/IGetUserEmailRepository";

export default class AdminDeleteUserService {
  private readonly getUserEmailRepository: IGetUserEmailRepository;

  constructor(getUserEmailRepository: IGetUserEmailRepository) {
    this.getUserEmailRepository = getUserEmailRepository;
  }

  public async execute(userEmail: string): Promise<Object> {
    const isUserRegistered: User | null =
      await this.getUserEmailRepository.execute(userEmail);

    if (isUserRegistered === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    await this.repository.user.delete({
      where: {
        email: userEmail,
      },
    });

    await this.repository.post.deleteMany({
      where: { userId: isUserRegistered.id },
    });

    await this.repository.likes.deleteMany({
      where: { userId: isUserRegistered.id },
    });

    await this.repository.comment.deleteMany({
      where: { userId: isUserRegistered.id },
    });

    return { message: "User deletado!" };
  }
}
