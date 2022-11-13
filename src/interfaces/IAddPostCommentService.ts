import { Comment } from "@prisma/client";

export default interface IAddPostCommentService {
  execute(
    id: number | undefined,
    postId: number,
    comment: string
  ): Promise<Comment>;
}
