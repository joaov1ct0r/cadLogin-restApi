import { Post } from "@prisma/client";

export default interface IGetPostIdRepository {
  execute(id: number, postId: number): Promise<Post | null>;
}
