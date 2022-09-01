import IPost from "../interfaces/IPost";

import Likes from "../database/models/likesModel";

import Comments from "../database/models/commentsModel";

import BadRequestError from "../errors/BadRequestError";

import IListPostService from "../interfaces/IListPostService";

import { ModelStatic } from "sequelize";

export default class ListPostService implements IListPostService {
  private readonly repository: ModelStatic<IPost>;

  constructor(repository: ModelStatic<IPost>) {
    this.repository = repository;
  }

  public async execute(postId: string): Promise<IPost> {
    const post: IPost | null = await this.repository.findOne({
      include: [
        {
          model: Likes,
        },
        {
          model: Comments,
        },
      ],
      where: { id: postId },
    });

    if (post === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    return post;
  }
}
