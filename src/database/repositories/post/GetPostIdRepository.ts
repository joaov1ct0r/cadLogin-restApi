import IGetPostIdRepository from "../../../interfaces/IGetPostIdRepository";
import prismaClient from "../../prismaClient";
import { PrismaClient, Post } from "@prisma/client";

export default class GetPostIdRepository implements IGetPostIdRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(id: number, postId: number): Promise<Post | null> {
    const post: Post | null = await this.repository.post.findFirst({
      where: {
        id: postId,
        AND: {
          userId: id,
        },
      },
    });

    return post;
  }
}
