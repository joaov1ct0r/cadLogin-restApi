import BadRequestError from "../errors/BadRequestError";
import IEditPostService from "../interfaces/IEditPostService";
import { PrismaClient, Post } from "@prisma/client";

export default class EditPostService implements IEditPostService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(
    id: number | undefined,
    postId: number,
    content: string
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

    await this.repository.post.updateMany({
      data: {
        content,
      },
      where: {
        id: postId,
        AND: {
          userId: id,
        },
      },
    });

    return { message: "Post editado!" };
  }
}
