import IPost from "./IPost";

export default interface IListAllPostsService {
  execute(): Promise<IPost[]>;
}
