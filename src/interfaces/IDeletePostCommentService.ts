export default interface IDeletePostCommentService {
  execute(
    userId: number | undefined,
    postId: number,
    commentId: number
  ): Promise<Object>;
}
