import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prismaClient";
import IDeleteLikeRepository from "../../../interfaces/IDeleteLikeRepository";

export default class DeleteLikeRepository implements IDeleteLikeRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(id: number, postId: number): Promise<void> {
    await this.repository.likes.deleteMany({
      where: {
        userId: id,
        AND: {
          postId,
        },
      },
    });
  }
}
