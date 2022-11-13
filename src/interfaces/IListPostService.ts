import { Post } from "@prisma/client";

export default interface IListPostService {
  execute(postId: number): Promise<Post>;
}
