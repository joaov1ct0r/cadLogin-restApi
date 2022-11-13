import { Post } from "@prisma/client";

export default interface IListAllPostsService {
  execute(): Promise<Post[]>;
}
