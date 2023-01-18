import BadRequestError from "../errors/BadRequestError";
import { Post } from "@prisma/client";
import IGetPostIdRepository from "../interfaces/IGetPostIdRepository";
import IAdminDeletePostRepository from "../interfaces/IAdminDeletePostRepository";

export default class AdminDeletePostService {
  private readonly getPostIdRepository: IGetPostIdRepository;
  private readonly deletePostRepository: IAdminDeletePostRepository;

  constructor(
    getPostIdRepository: IGetPostIdRepository,
    deletePostRepository: IAdminDeletePostRepository
  ) {
    this.getPostIdRepository = getPostIdRepository;
    this.deletePostRepository = deletePostRepository;
  }

  public async execute(postId: number): Promise<void> {
    const isPostRegistered: Post | null =
      await this.getPostIdRepository.execute(undefined, postId);

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    await this.deletePostRepository.execute(isPostRegistered.id);
  }
}
