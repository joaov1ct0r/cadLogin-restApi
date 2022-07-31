import Post from "../database/models/postModel";

import IPost from "../interfaces/IPost";

import Likes from "../database/models/likesModel";

import Comments from "../database/models/commentsModel";

export default class ListAllPostsService {
  public async execute(): Promise<IPost[]> {
    const posts: IPost[] = await Post.findAll({
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
