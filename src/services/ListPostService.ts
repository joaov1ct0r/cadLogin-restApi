import BadRequestError from "../errors/BadRequestError";
import { Post } from "@prisma/client";
import IListPostRepository from "../interfaces/IListPostRepository";

export default class ListPostService {
  private readonly repository: IListPostRepository;

  constructor(repository: IListPostRepository) {
    this.repository = repository;
  }

  public async execute(postId: number): Promise<Post> {
    const post: Post | null = await this.repository.execute(postId);

    if (post === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    return post;
  }
}
