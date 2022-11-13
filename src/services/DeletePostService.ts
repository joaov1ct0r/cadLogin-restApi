import BadRequestError from "../errors/BadRequestError";
import InternalError from "../errors/InternalError";
import IDeletePostService from "../interfaces/IDeletePostService";
import { Post, PrismaClient } from "@prisma/client";

export default class DeletePostService implements IDeletePostService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(id: number | undefined, postId: number): Promise<Post> {
    const isPostRegistered: Post | null = await this.repository.post.findFirst({
      where: {
        id: postId,
        userId: id,
      },
    });

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const deletedPost: Post = await this.repository.post.delete({
      where: {
        id: postId,
      },
    });

    if (!deletedPost) {
      throw new InternalError("Falha ao deletar post!");
    }

    await this.repository.likes.deleteMany({
      where: {
        postId,
      },
    });

    await this.repository.comment.deleteMany({
      where: {
        postId,
      },
    });

    return deletedPost;
  }
}
