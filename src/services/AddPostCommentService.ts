import Comments from "../database/models/commentsModel";

import IComments from "../interfaces/IComments";

import Post from "../database/models/postModel";

import IPost from "../interfaces/IPost";

import User from "../database/models/userModel";

import IUser from "../interfaces/IUser";

import BadRequestError from "../errors/BadRequestError";

export default class AddPostCommentService {
  public async execute(
    id: string | undefined,
    postId: string,
    comment: string
  ): Promise<IComments> {
    const isPostRegistered: IPost | null = await Post.findOne({
      where: { id: postId },
    });

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const user: IUser | null = await User.findOne({
      where: { id },
    });

    const createdComment: IComments = await Comments.create({
      author: user!.email,
      userId: user!.id,
      comment,
      postId,
    });

    return createdComment;
  }
}
