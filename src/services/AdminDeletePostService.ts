import BadRequestError from "../errors/BadRequestError";
import InternalError from "../errors/InternalError";
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

    const deletedPost: Post = await this.repository.post.delete({
      where: { id: postId },
    });

    if (!deletedPost) {
      throw new InternalError("Falha ao deletar Post!");
    }

    return { message: "Post deletado!" };
  }
}
