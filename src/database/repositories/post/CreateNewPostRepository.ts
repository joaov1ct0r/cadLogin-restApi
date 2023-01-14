import ICreateNewPostRepository from "../../../interfaces/ICreateNewPostRepository";
import prismaClient from "../../prismaClient";
import { PrismaClient, Post } from "@prisma/client";

export default class CreateNewPostRepository
  implements ICreateNewPostRepository
{
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(
    author: string,
    content: string,
    userId: number
  ): Promise<Post> {
    const newPost: Post = await this.repository.post.create({
      data: {
        author,
        content,
        userId,
      },
    });

    return newPost;
  }
}
