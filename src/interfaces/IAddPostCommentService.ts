import { Comment } from "@prisma/client";

export default interface IAddPostCommentService {
  execute(id: number, postId: number, comment: string): Promise<Comment>;
}
