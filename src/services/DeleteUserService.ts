import User from "../database/models/userModel";

import Post from "../database/models/postModel";

import InternalError from "../errors/InternalError";

export default class DeleteUserService {
  async execute(id: string | undefined): Promise<number> {
    const deletedUser: number = await User.destroy({
      where: { id },
    });

    if (deletedUser === 0) {
      throw new InternalError("Falha ao deletar usuario!");
    }

    // eslint-disable-next-line no-unused-vars
    const deletedPost: number = await Post.destroy({
      where: { userId: id },
    });

    return deletedUser;
  }
}
