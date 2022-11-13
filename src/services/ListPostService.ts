import BadRequestError from "../errors/BadRequestError";
import IListPostService from "../interfaces/IListPostService";
import { PrismaClient, Post } from "@prisma/client";

export default class ListPostService implements IListPostService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(postId: number): Promise<Post> {
    const post: Post | null = await this.repository.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        Comment: true,
        Likes: true,
      },
    });

    if (post === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    return post;
  }
}
