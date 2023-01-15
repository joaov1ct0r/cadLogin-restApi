import { Likes } from "@prisma/client";

export default interface IGetLikeIdRepository {
  execute(id: number, postId: number): Promise<Likes | null>;
}
