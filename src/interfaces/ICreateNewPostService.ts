import { Post } from "@prisma/client";

export default interface ICreateNewPostService {
  execute(id: number | undefined, content: string): Promise<Post>;
}
