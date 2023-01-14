export default interface IUpdatePostRepository {
  execute(content: string, id: number, postId: number): Promise<void>;
}
