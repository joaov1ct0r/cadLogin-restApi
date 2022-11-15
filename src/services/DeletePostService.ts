import BadRequestError from "../errors/BadRequestError";
import IDeletePostService from "../interfaces/IDeletePostService";
import { Post, PrismaClient } from "@prisma/client";

export default class DeletePostService implements IDeletePostService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(
    id: number | undefined,
    postId: number
  ): Promise<Object> {
    const isPostRegistered: Post | null = await this.repository.post.findFirst({
      where: {
        id: postId,
        AND: {
          userId: id,
        },
      },
    });

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    await this.repository.post.deleteMany({
      where: {
        id: postId,
        AND: {
          userId: id,
        },
      },
    });

    await this.repository.likes.deleteMany({
      where: {
        postId,
        AND: {
          userId: id,
        },
      },
    });

    await this.repository.comment.deleteMany({
      where: {
        postId,
        AND: {
          userId: id,
        },
      },
    });

    return { message: "Post deletado" };
  }
}
