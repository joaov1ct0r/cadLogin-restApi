export default interface IDeletePostService {
  execute(id: string | undefined, postId: string): Promise<number>;
}
