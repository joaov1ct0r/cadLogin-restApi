export default interface IDeletePostService {
  execute(id: number | undefined, postId: number): Promise<Object>;
}
