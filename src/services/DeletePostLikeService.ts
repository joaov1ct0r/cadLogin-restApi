import BadRequestError from "../errors/BadRequestError";
import { Likes, Post } from "@prisma/client";
import IGetPostIdRepository from "../interfaces/IGetPostIdRepository";
import IGetLikeIdRepository from "../interfaces/IGetLikeIdRepository";
import IDeleteLikeRepository from "../interfaces/IDeleteLikeRepository";

export default class DeletePostLikeService {
  private readonly getPostIdRepository: IGetPostIdRepository;
  private readonly getLikeIdRepository: IGetLikeIdRepository;
  private readonly deleteLikeRepository: IDeleteLikeRepository;

  constructor(
    getPostIdRepository: IGetPostIdRepository,
    getLikeIdRepository: IGetLikeIdRepository,
    deleteLikeRepository: IDeleteLikeRepository
  ) {
    this.getPostIdRepository = getPostIdRepository;
    this.getLikeIdRepository = getLikeIdRepository;
    this.deleteLikeRepository = deleteLikeRepository;
  }

  public async execute(userId: number, postId: number): Promise<void> {
    const isPostRegistered: Post | null =
      await this.getPostIdRepository.execute(undefined, postId);

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const isLikeRegistered: Likes | null =
      await this.getLikeIdRepository.execute(userId, postId);

    if (isLikeRegistered === null) {
      throw new BadRequestError("Like não encontrado!");
    }

    await this.deleteLikeRepository.execute(userId, postId);
  }
}
