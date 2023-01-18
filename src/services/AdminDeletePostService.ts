import BadRequestError from "../errors/BadRequestError";
import { Post } from "@prisma/client";
import IGetPostIdRepository from "../interfaces/IGetPostIdRepository";

export default class AdminDeletePostService {
  private readonly getPostIdRepository: IGetPostIdRepository;

  constructor(getPostIdRepository: IGetPostIdRepository) {
    this.getPostIdRepository = getPostIdRepository;
  }

  public async execute(postId: number): Promise<void> {
    const isPostRegistered: Post | null =
      await this.getPostIdRepository.execute(undefined, postId);

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    await this.repository.post.delete({
      where: { id: postId },
    });
  }
}
