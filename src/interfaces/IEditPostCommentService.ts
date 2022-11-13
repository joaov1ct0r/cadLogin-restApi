export default interface IEditPostCommentService {
  execute(
    userId: number | undefined,
    postId: number,
    commentId: number,
    comment: string
  ): Promise<Object>;
}
