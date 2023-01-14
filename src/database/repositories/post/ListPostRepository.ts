import { Post, PrismaClient } from "@prisma/client";
import prismaClient from "../../prismaClient";
import IListPostRepository from "../../../interfaces/IListPostRepository";

export default class ListPostRepository implements IListPostRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(postId: number): Promise<Post | null> {
    const post: Post | null = await this.repository.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        Comment: true,
        Likes: true,
      },
    });

    return post;
  }
}
