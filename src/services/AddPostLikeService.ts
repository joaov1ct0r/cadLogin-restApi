import BadRequestError from "../errors/BadRequestError";
import { Likes, Post, User } from "@prisma/client";
import IGetPostIdRepository from "../interfaces/IGetPostIdRepository";
import IGetUserIdRepository from "../interfaces/IGetUserIdRepository";

export default class AddPostLikeService {
  private readonly getPostIdRepository: IGetPostIdRepository;
  private readonly getUserIdRepository: IGetUserIdRepository;

  constructor(
    getPostIdRepository: IGetPostIdRepository,
    getUserIdRepository: IGetUserIdRepository
  ) {
    this.getPostIdRepository = getPostIdRepository;
    this.getUserIdRepository = getUserIdRepository;
    this.repository = repository;
  }

  public async execute(postId: number, id: number | undefined): Promise<Likes> {
    const isPostRegistered: Post | null =
      await this.getPostIdRepository.execute(postId);

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const user: User | null = await this.getUserIdRepository.execute(id);

    if (user === null) throw new BadRequestError("User não encontrado!");

    const isLikeRegistered: Likes | null =
      await this.repository.likes.findFirst({
        where: {
          postId,
          AND: {
            userId: id,
          },
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
