export default interface IAdminDeletePostRepository {
  execute(postId: number): Promise<void>;
}
