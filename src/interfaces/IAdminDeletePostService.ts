export default interface IAdminDeletePostService {
  execute(postId: number): Promise<Object>;
}
