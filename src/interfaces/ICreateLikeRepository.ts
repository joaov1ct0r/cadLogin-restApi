import { Likes } from "@prisma/client";

export default interface ICreateLikeRepository {
  execute(postId: number, author: string, id: number): Promise<Likes>;
}
