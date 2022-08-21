import User from "../database/models/userModel";

import IUser from "../interfaces/IUser";

import Post from "../database/models/postModel";

import IPost from "../interfaces/IPost";

import BadRequestError from "../errors/BadRequestError";

import ICreateNewPostService from "../interfaces/ICreateNewPostService";

export default class CreateNewPostService implements ICreateNewPostService {
  public async execute(id: string, content: string): Promise<IPost> {
    const user: IUser | null = await User.findOne({
      where: { id },
    });

    if (user === null) {
      throw new BadRequestError("Usuario não encontrado!");
    }

    const newPost: IPost = await Post.create({
      author: user!.email,
      content,
      userId: user!.id,
    });

    return newPost;
  }
}
