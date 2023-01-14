import BadRequestError from "../errors/BadRequestError";
import { Post } from "@prisma/client";
import IGetPostIdRepository from "../interfaces/IGetPostIdRepository";
import IDeletePostRepository from "../interfaces/IDeletePostRepository";

export default class DeletePostService {
  private readonly getPostIdRepository: IGetPostIdRepository;
  private readonly deletePostRepository: IDeletePostRepository;

  constructor(
    getPostIdRepository: IGetPostIdRepository,
    deletePostRepository: IDeletePostRepository
  ) {
    this.getPostIdRepository = getPostIdRepository;
    this.deletePostRepository = deletePostRepository;
  }

  public async execute(id: number, postId: number): Promise<void> {
    const isPostRegistered: Post | null =
      await this.getPostIdRepository.execute(id, postId);

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    await this.deletePostRepository.execute(postId, id);
  }
}
