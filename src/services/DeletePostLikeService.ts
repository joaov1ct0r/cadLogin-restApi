import { Likes, Post, PrismaClient } from "@prisma/client";
import BadRequestError from "../errors/BadRequestError";
import InternalError from "../errors/InternalError";
import IDeletePostLikeService from "../interfaces/IDeletePostLikeService";

export default class DeletePostLikeService implements IDeletePostLikeService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(
    userId: number | undefined,
    postId: number
  ): Promise<Object> {
    const isPostRegistered: Post | null = await this.repository.post.findUnique(
      {
        where: { id: postId },
      }
    );

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const isLikeRegistered: Likes | null =
      await this.repository.likes.findFirst({
        where: {
          userId,
          AND: {
            postId,
          },
        },
      });

    if (isLikeRegistered === null) {
      throw new BadRequestError("Like não encontrado!");
    }

    const deletedLike = await this.repository.likes.deleteMany({
      where: {
        userId,
        AND: {
          postId,
        },
      },
    });

    if (!deletedLike) {
      throw new InternalError("Falha ao deletar Like!");
    }

    return { message: "Deleted" };
  }
}
