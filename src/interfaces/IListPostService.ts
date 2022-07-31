import IPost from "./IPost";

export default interface IListPostService {
  execute(postId: string): Promise<IPost>;
}
