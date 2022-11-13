import { Post } from "@prisma/client";

export default interface IEditPostService {
  execute(
    id: number | undefined,
    postId: number,
    content: string
  ): Promise<Post>;
}
