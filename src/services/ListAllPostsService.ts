import { Post } from "@prisma/client";
import IListAllPostsRepository from "../interfaces/IListAllPostsRepository";

export default class ListAllPostsService {
  private readonly repository: IListAllPostsRepository;

  constructor(repository: IListAllPostsRepository) {
    this.repository = repository;
  }

  public async execute(): Promise<Post[]> {
    const posts: Post[] = await this.repository.execute();

    return posts;
  }
}
