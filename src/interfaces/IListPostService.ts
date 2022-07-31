import IPost from "./postInterface";

export default interface IListPostService {
  execute(postId: string): Promise<IPost>;
}
