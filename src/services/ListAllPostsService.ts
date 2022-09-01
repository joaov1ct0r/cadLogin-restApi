import IPost from "../interfaces/IPost";

import Likes from "../database/models/likesModel";

import Comments from "../database/models/commentsModel";

import IListAllPostsService from "../interfaces/IListAllPostsService";

import { ModelStatic } from "sequelize";

export default class ListAllPostsService implements IListAllPostsService {
  private readonly repository: ModelStatic<IPost>;

  constructor(repository: ModelStatic<IPost>) {
    this.repository = repository;
  }

  public async execute(): Promise<IPost[]> {
    const posts: IPost[] = await this.repository.findAll({
      include: [
        {
          model: Likes,
        },
        {
          model: Comments,
        },
      ],
    });

    return posts;
  }
}
