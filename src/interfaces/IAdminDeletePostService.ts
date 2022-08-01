export default interface IAdminDeletePostService {
  execute(postId: string): Promise<number>;
}
