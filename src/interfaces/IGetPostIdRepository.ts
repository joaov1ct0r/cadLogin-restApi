import { Post } from "@prisma/client";

export default interface IGetPostIdRepository {
  execute(id: number | undefined, postId: number): Promise<Post | null>;
}
