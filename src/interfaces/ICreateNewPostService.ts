import IPost from "./postInterface";

export default interface ICreateNewPostService {
  execute(id: string | undefined, content: string): Promise<IPost>;
}
