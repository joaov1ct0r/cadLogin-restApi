import { Post, PrismaClient } from "@prisma/client";
import IListAllPostsService from "../interfaces/IListAllPostsService";

export default class ListAllPostsService implements IListAllPostsService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(): Promise<Post[]> {
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
