import Post from "../database/models/postModel";

import IPost from "../interfaces/IPost";

import Likes from "../database/models/likesModel";

import Comments from "../database/models/commentsModel";

import BadRequestError from "../errors/BadRequestError";

export default class ListPostService {
  public async execute(postId: string): Promise<IPost> {
    const post: IPost | null = await Post.findOne({
      include: [
        {
          model: Likes,
          where: { postId },
        },
        {
          model: Comments,
          where: { postId },
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
