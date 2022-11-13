import BadRequestError from "../errors/BadRequestError";
import IAddPostLikeService from "../interfaces/IAddPostLikeService";
import { PrismaClient, Likes, Post, User } from "@prisma/client";

export default class AddPostLikeService implements IAddPostLikeService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(postId: number, id: number | undefined): Promise<Likes> {
    const isPostRegistered: Post | null = await this.repository.post.findUnique(
      {
        where: { id: postId },
      }
    );

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const user: User | null = await this.repository.user.findUnique({
      where: { id },
    });

    const isLikeRegistered: Likes | null =
      await this.repository.likes.findFirst({
        where: {
          postId,
          userId: id,
        },
      });

    if (isLikeRegistered !== null) {
      throw new BadRequestError("Like já registrado!");
    }

    const addedLike = await this.repository.likes.create({
      data: {
        postId,
        likedBy: user!.email,
        userId: user!.id,
      },
    });

    return addedLike;
  }
}
