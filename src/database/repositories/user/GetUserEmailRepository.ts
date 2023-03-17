import { PrismaClient, User } from "@prisma/client";
import prismaClient from "../../prismaClient";
import IGetUserEmailRepository from "../../../interfaces/IGetUserEmailRepository";

export default class GetUserEmailRepository implements IGetUserEmailRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(email: string): Promise<User | null> {
    const user = await this.repository.user.findUnique({
      where: { email },
    });

    return user;
  }
}
