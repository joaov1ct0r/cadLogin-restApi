import { Post } from "@prisma/client";

export default interface IListPostRepository {
  execute(postId: number): Promise<Post | null>;
}
