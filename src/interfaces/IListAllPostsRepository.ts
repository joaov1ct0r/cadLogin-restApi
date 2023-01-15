import { Post } from "@prisma/client";

export default interface IListAllPostsRepository {
  execute(): Promise<Post[]>;
}
