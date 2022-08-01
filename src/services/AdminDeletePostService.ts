import Post from "../database/models/postModel";

import IPost from "../interfaces/IPost";

import BadRequestError from "../errors/BadRequestError";

import InternalError from "../errors/InternalError";

export default class AdminDeletePostService {
  public async execute(postId: string): Promise<number> {
    const isPostRegistered: IPost | null = await Post.findOne({
      where: {
        id: postId,
      },
    });

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const deletedPost: number = await Post.destroy({
      where: { id: postId },
    });

    if (deletedPost === 0) {
      throw new InternalError("Falha ao deletar Post!");
    }

    return Number(deletedPost);
  }
}
