export default interface IEditPostService {
  execute(
    id: string | undefined,
    postId: string,
    content: string
  ): Promise<number>;
}
