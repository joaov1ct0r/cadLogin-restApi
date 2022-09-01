import ILikes from "../interfaces/ILikes";

import IPost from "../interfaces/IPost";

import IUser from "../interfaces/IUser";

import BadRequestError from "../errors/BadRequestError";

import { ModelStatic, Op } from "sequelize";

import IAddPostLikeService from "../interfaces/IAddPostLikeService";

export default class AddPostLikeService implements IAddPostLikeService {
  private readonly repository: ModelStatic<IPost>;

  private readonly userRepository: ModelStatic<IUser>;

  private readonly likesRepository: ModelStatic<ILikes>;

  constructor(
    repository: ModelStatic<IPost>,
    userRepository: ModelStatic<IUser>,
    likesRepository: ModelStatic<ILikes>
  ) {
    this.repository = repository;

    this.userRepository = userRepository;

    this.likesRepository = likesRepository;
  }

  public async execute(
    postId: string,
    id: string | undefined
  ): Promise<ILikes> {
    const isPostRegistered: IPost | null = await this.repository.findOne({
      where: { id: postId },
    });

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const user: IUser | null = await this.userRepository.findOne({
      where: { id },
    });

    const isLikeRegistered: ILikes | null = await this.likesRepository.findOne({
      where: {
        [Op.and]: [
          {
            postId,
            userId: id,
          },
        ],
      },
    });

    if (isLikeRegistered !== null) {
      throw new BadRequestError("Like já registrado!");
    }

    // eslint-disable-next-line no-unused-vars
    const addedLike: ILikes = await this.likesRepository.create({
      postId,
      likedBy: user!.email,
      userId: user!.id,
    });

    return addedLike;
  }
}
