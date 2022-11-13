import { PrismaClient, Post, User } from "@prisma/client";
import BadRequestError from "../errors/BadRequestError";
import ICreateNewPostService from "../interfaces/ICreateNewPostService";

export default class CreateNewPostService implements ICreateNewPostService {
  private readonly repository: PrismaClient;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  public async execute(id: number, content: string): Promise<Post> {
    const user: User | null = await this.repository.user.findUnique({
      where: { id },
    });

    if (user === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    const newPost: Post = await this.repository.post.create({
      data: {
        author: user!.email,
        content,
        userId: user!.id,
      },
    });

    return newPost;
  }
}
