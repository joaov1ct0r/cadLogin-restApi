import BadRequestError from "../errors/BadRequestError";
import IEditPostService from "../interfaces/IEditPostService";
import { Post } from "@prisma/client";
import IGetPostIdRepository from "../interfaces/IGetPostIdRepository";

export default class EditPostService implements IEditPostService {
  private readonly getPostIdRepository: IGetPostIdRepository;

  constructor(getPostIdRepository: IGetPostIdRepository) {
    this.getPostIdRepository = getPostIdRepository;
  }

  public async execute(
    id: number | undefined,
    postId: number,
    content: string
  ): Promise<Object> {
    const isPostRegistered: Post | null =
      await this.getPostIdRepository.execute(id, postId);

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    await this.repository.post.updateMany({
      data: {
        content,
      },
      where: {
        id: postId,
        AND: {
          userId: id,
        },
      },
    });

    return { message: "Post editado!" };
  }
}
