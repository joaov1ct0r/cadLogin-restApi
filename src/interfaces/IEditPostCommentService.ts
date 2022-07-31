export default interface IEditPostCommentService {
  execute(
    userId: string | undefined,
    postId: string,
    commentId: string,
    comment: string
  ): Promise<number>;
}
