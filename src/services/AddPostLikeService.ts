import Likes from "../database/models/likesModel";

import ILikes from "../interfaces/ILikes";

import Post from "../database/models/postModel";

import IPost from "../interfaces/IPost";

import User from "../database/models/userModel";

import IUser from "../interfaces/IUser";

import BadRequestError from "../errors/BadRequestError";

import { Op } from "sequelize";

import IAddPostLikeService from "../interfaces/IAddPostLikeService";

export default class AddPostLikeService implements IAddPostLikeService {
  public async execute(
    postId: string,
    id: string | undefined
  ): Promise<ILikes> {
    const isPostRegistered: IPost | null = await Post.findOne({
      where: { id: postId },
    });

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const user: IUser | null = await User.findOne({
      where: { id },
    });

    const isLikeRegistered: ILikes | null = await Likes.findOne({
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
    const addedLike: ILikes = await Likes.create({
      postId,
      likedBy: user!.email,
      userId: user!.id,
    });

    return addedLike;
  }
}
