import IComments from "./IComments";

export default interface IAddPostCommentService {
  execute(
    id: string | undefined,
    postId: string,
    comment: string
  ): Promise<IComments>;
}
