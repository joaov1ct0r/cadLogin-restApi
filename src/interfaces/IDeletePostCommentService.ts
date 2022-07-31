export default interface IDeletePostCommentService {
  execute(
    userId: string | undefined,
    postId: string,
    commentId: string
  ): Promise<number>;
}
