import ILikes from "./ILikes";

export default interface IAddPostLikeService {
  execute(postId: string, id: string | undefined): Promise<ILikes>;
}
