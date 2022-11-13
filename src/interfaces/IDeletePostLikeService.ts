export default interface IDeletePostLikeService {
  execute(userId: number | undefined, postId: number): Promise<Object>;
}
