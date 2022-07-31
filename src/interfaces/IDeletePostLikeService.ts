export default interface IDeletePostLikeService {
  execute(userId: string | undefined, postId: string): Promise<number>;
}
