export default interface IUpdateCommentRepository {
  execute(
    comment: string,
    author: string,
    userId: number,
    postId: number,
    commentId: number
  ): Promise<void>;
}
