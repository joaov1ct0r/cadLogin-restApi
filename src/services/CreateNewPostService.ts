import { Post, User } from "@prisma/client";
import BadRequestError from "../errors/BadRequestError";

export default class CreateNewPostService {
  private readonly createNewPostRepository: ICreateNewPostRepository;
  private readonly getUserIdRepository: IGetUserIdRepository;

  constructor(
    createNewPostRepository: ICreateNewPostRepository,
    getUserIdRepository: IGetUserIdRepository
  ) {
    this.createNewPostRepository = createNewPostRepository;
    this.getUserIdRepository = getUserIdRepository;
  }

  public async execute(id: number, content: string): Promise<Post> {
    const user: User | null = await this.getUserIdRepository.execute(id);

    if (user === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    const newPost: Post = await this.createNewPostRepository.execute(
      user.email,
      content,
      user.id
    );

    return newPost;
  }
}
