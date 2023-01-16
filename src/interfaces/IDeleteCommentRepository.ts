export default interface IDeleteCommentRepository {
  execute(commentId: number, postId: number, userId: number): Promise<void>;
}
