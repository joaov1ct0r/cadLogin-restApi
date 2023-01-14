import IDeleteUserRepository from "../../../interfaces/IDeleteUserRepository";
import prismaClient from "../../prismaClient";
import { PrismaClient } from "@prisma/client";

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
