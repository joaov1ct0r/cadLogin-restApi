import BadRequestError from "../errors/BadRequestError";
import { Post } from "@prisma/client";
import IGetPostIdRepository from "../interfaces/IGetPostIdRepository";
import IUpdatePostRepository from "../interfaces/IUpdatePostRepository";

export default class EditPostService {
  private readonly getPostIdRepository: IGetPostIdRepository;
  private readonly updatePostRepository: IUpdatePostRepository;

  constructor(
    getPostIdRepository: IGetPostIdRepository,
    updatePostRepository: IUpdatePostRepository
  ) {
    this.getPostIdRepository = getPostIdRepository;
    this.updatePostRepository = updatePostRepository;
  }

  public async execute(
    id: number,
    postId: number,
    content: string
  ): Promise<void> {
    const isPostRegistered: Post | null =
      await this.getPostIdRepository.execute(id, postId);

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    await this.updatePostRepository.execute(content, id, postId);
  }
}
