import IPost from "./postInterface";

export default interface IListAllPostsService {
  execute(): Promise<IPost[]>;
}
