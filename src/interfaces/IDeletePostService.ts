import { Post } from "@prisma/client";

export default interface IDeletePostService {
  execute(id: number | undefined, postId: number): Promise<Post>;
}
