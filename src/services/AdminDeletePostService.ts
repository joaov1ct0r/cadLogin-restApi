import BadRequestError from "../errors/BadRequestError";
import IAdminDeletePostService from "../interfaces/IAdminDeletePostService";
import { PrismaClient, Post } from "@prisma/client";

export default class AdminDeletePostService implements IAdminDeletePostService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(postId: number): Promise<Object> {
    const isPostRegistered: Post | null = await this.repository.post.findUnique(
      {
        where: {
          id: postId,
        },
      }
    );

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    await this.repository.post.delete({
      where: { id: postId },
    });

    return { message: "Post deletado!" };
  }
}
