import IUser from "../interfaces/IUser";

import IPost from "../interfaces/IPost";

import BadRequestError from "../errors/BadRequestError";

import ICreateNewPostService from "../interfaces/ICreateNewPostService";
import { ModelStatic } from "sequelize/types";

export default class CreateNewPostService implements ICreateNewPostService {
  private readonly repository: ModelStatic<IPost>;

  private readonly userRepository: ModelStatic<IUser>;

  constructor(
    repository: ModelStatic<IPost>,
    userRepository: ModelStatic<IUser>
  ) {
    this.repository = repository;

    this.userRepository = userRepository;
  }

  public async execute(id: string, content: string): Promise<IPost> {
    const user: IUser | null = await this.userRepository.findOne({
      where: { id },
    });

    if (user === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    const newPost: IPost = await this.repository.create({
      author: user!.email,
      content,
      userId: user!.id,
    });

    return newPost;
  }
}
