import { Post, PrismaClient } from "@prisma/client";
import prismaClient from "../../prismaClient";

interface IListAllPostsRepository {
  execute(): Promise<Post[]>;
}

export default class ListAllPostsRepository implements IListAllPostsRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(): Promise<Post[]> {
    const posts: Post[] = await this.repository.post.findMany({
      include: {
        Likes: true,
        Comment: true,
        user: true,
      },
    });

    return posts;
  }
}
