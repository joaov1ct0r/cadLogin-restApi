import { Comment } from "@prisma/client";

export default interface IGetCommentRepository {
  execute(
    commentId: number,
    postId: number,
    userId?: number
  ): Promise<Comment | null>;
}
