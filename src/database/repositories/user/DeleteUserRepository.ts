import prismaClient from "../../prismaClient";
import { PrismaClient } from "@prisma/client";

interface IDeleteUserRepository {
  execute(id: number): Promise<void>;
}

export default class DeleteUserRepository implements IDeleteUserRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(id: number): Promise<void> {
    await this.repository.user.delete({
      where: { id },
    });
  }
}
