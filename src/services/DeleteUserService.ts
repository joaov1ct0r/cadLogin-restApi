import User from "../database/models/userModel";

import Post from "../database/models/postModel";

export default class DeleteUserService {
  async execute(id: string | undefined): Promise<number> {
    try {
      const deletedUser: number = await User.destroy({
        where: { id },
      });

      if (deletedUser === 0) {
        throw new Error("Falha ao deletar usuario!");
      }

      // eslint-disable-next-line no-unused-vars
      const deletedPost: number = await Post.destroy({
        where: { userId: id },
      });

      return deletedUser;
    } catch (err: unknown) {
      throw new Error("Erro interno!");
    }
  }
}
