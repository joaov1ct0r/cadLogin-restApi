import IPost from "../interfaces/IPost";

import IComments from "../interfaces/IComments";

import BadRequestError from "../errors/BadRequestError";

import InternalError from "../errors/InternalError";

import { ModelStatic, Op } from "sequelize";

import IDeletePostCommentService from "../interfaces/IDeletePostCommentService";

export default class DeletePostCommentService
  implements IDeletePostCommentService
{
  private readonly repository: ModelStatic<IPost>;

  private readonly commentRepository: ModelStatic<IComments>;

  constructor(
    repository: ModelStatic<IPost>,
    commentRepository: ModelStatic<IComments>
  ) {
    this.repository = repository;

    this.commentRepository = commentRepository;
  }

  public async execute(
    userId: string | undefined,
    postId: string,
    commentId: string
  ): Promise<number> {
    const isPostRegistered: IPost | null = await this.repository.findOne({
      where: { id: postId },
    });

    if (isPostRegistered === null) {
      throw new BadRequestError("Post não encontrado!");
    }

    const isCommentRegistered: IComments | null =
      await this.commentRepository.findOne({
        where: {
          [Op.and]: [
            {
              postId,
              userId,
              id: commentId,
            },
          ],
        },
      });

    if (isCommentRegistered === null) {
      throw new BadRequestError("Comentario não encontrado!");
    }

    const deletedComment: number = await this.commentRepository.destroy({
      where: {
        [Op.and]: [
          {
            postId,
            userId,
            id: commentId,
          },
        ],
      },
    });

    if (deletedComment === 0) {
      throw new InternalError("Falha ao deletar comentario!");
    }

    return Number(deletedComment);
  }
}
