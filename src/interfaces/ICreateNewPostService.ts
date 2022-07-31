import IPost from "./IPost";

export default interface ICreateNewPostService {
  execute(id: string | undefined, content: string): Promise<IPost>;
}
