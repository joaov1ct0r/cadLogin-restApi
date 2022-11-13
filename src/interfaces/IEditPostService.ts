export default interface IEditPostService {
  execute(
    id: number | undefined,
    postId: number,
    content: string
  ): Promise<Object>;
}
