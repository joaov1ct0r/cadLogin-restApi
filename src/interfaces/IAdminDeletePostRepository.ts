export default interface IDeletePostRepository {
  execute(postId: number): Promise<void>;
}
