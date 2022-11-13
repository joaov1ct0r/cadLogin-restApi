import { Likes } from "@prisma/client";

export default interface IAddPostLikeService {
  execute(postId: number, id: number | undefined): Promise<Likes>;
}
