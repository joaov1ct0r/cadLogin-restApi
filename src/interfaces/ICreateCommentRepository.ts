import { Comment } from "@prisma/client";

export default interface ICreateCommentRepository {
  execute(
    author: string,
    userId: number,
    comment: string,
    postId: number
  ): Promise<Comment>;
}
