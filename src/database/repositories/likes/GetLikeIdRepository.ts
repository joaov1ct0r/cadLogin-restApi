import { Likes, PrismaClient } from "@prisma/client";
import prismaClient from "../../prismaClient";
import IGetLikeIdRepository from "../../../interfaces/IGetLikeIdRepository";

export default class GetLikeIdRepository implements IGetLikeIdRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(id: number, postId: number): Promise<Likes | null> {
    const like: Likes | null = await this.repository.likes.findFirst({
      where: {
        postId,
        AND: {
          userId: id,
        },
      },
    });

    return like;
  }
}
