export default interface IDeletePostRepository {
  execute(postId: number, id: number): Promise<void>;
}
