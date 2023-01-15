import { Likes, PrismaClient } from "@prisma/client";
import prismaClient from "../../prismaClient";

interface IGetLikeIdRepository {
  execute(id: number, postId: number): Promise<Likes | null>;
}

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
