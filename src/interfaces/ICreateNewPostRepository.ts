import { Post } from "@prisma/client";

export default interface ICreateNewPostRepository {
  execute(author: string, content: string, userId: number): Promise<Post>;
}
