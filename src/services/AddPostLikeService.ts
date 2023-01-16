import BadRequestError from "../errors/BadRequestError";
import { Likes, Post, User } from "@prisma/client";
import IGetPostIdRepository from "../interfaces/IGetPostIdRepository";
import IGetUserIdRepository from "../interfaces/IGetUserIdRepository";
import IGetLikeIdRepository from "../interfaces/IGetLikeIdRepository";
import ICreateLikeRepository from "../interfaces/ICreateLikeRepository";

export default class AddPostLikeService {
  private readonly getPostIdRepository: IGetPostIdRepository;
  private readonly getUserIdRepository: IGetUserIdRepository;
  private readonly getLikeIdRepository: IGetLikeIdRepository;
  private readonly createLikeRepository: ICreateLikeRepository;

  constructor(
    getPostIdRepository: IGetPostIdRepository,
    getUserIdRepository: IGetUserIdRepository,
    getLikeIdRepository: IGetLikeIdRepository,
    createLikeRepository: ICreateLikeRepository
  ) {
    this.getPostIdRepository = getPostIdRepository;
    this.getUserIdRepository = getUserIdRepository;
    this.getLikeIdRepository = getLikeIdRepository;
    this.createLikeRepository = createLikeRepository;
  }

  public async execute(postId: number, id: number): Promise<Likes> {
    const isPostRegistered: Post | null =
      await this.getPostIdRepository.execute(undefined, postId);

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const user: User | null = await this.getUserIdRepository.execute(id);

    if (user === null) throw new BadRequestError("User não encontrado!");

    const isLikeRegistered: Likes | null =
      await this.getLikeIdRepository.execute(id, postId);

    if (isLikeRegistered !== null) {
      throw new BadRequestError("Like já registrado!");
    }

    const addedLike = await this.createLikeRepository.execute(
      isPostRegistered.id,
      user.email,
      user.id
    );

    return addedLike;
  }
}
