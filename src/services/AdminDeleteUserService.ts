import BadRequestError from "../errors/BadRequestError";
import IAdminDeleteUserService from "../interfaces/IAdminDeleteUserService";
import { PrismaClient, User } from "@prisma/client";

export default class AdminDeleteUserService implements IAdminDeleteUserService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(userEmail: string): Promise<Object> {
    const isUserRegistered: User | null = await this.repository.user.findUnique(
      {
        where: { email: userEmail },
      }
    );

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
