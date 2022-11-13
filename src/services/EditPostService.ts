import BadRequestError from "../errors/BadRequestError";
import InternalError from "../errors/InternalError";
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

    const editedPost = await this.repository.post.updateMany({
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

    if (!editedPost) {
      throw new InternalError("Falha ao atualizar Post!");
    }

    return { message: "Post editado!" };
  }
}
