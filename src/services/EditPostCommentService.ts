import IPost from "../interfaces/IPost";

import BadRequestError from "../errors/BadRequestError";

import IComments from "../interfaces/IComments";

import { ModelStatic, Op } from "sequelize";

import IUser from "../interfaces/IUser";

import InternalError from "../errors/InternalError";

import IEditPostCommentService from "../interfaces/IEditPostCommentService";

export default class EditPostCommentService implements IEditPostCommentService {
  private readonly repository: ModelStatic<IPost>;

  private readonly userRepository: ModelStatic<IUser>;

  private readonly commentRepository: ModelStatic<IComments>;

  constructor(
    repository: ModelStatic<IPost>,
    userRepository: ModelStatic<IUser>,
    commentRepository: ModelStatic<IComments>
  ) {
    this.repository = repository;

    this.userRepository = userRepository;

    this.commentRepository = commentRepository;
  }

  public async execute(
    userId: string | undefined,
    postId: string,
    commentId: string,
    comment: string
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

    const user: IUser | null = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const updatedComment: [affectedCount: number] =
      await this.commentRepository.update(
        {
          comment,
          author: user!.email,
          userId,
          postId: isPostRegistered.id,
        },
        {
          where: {
            [Op.and]: [
              {
                postId,
                userId,
                id: commentId,
              },
            ],
          },
        }
      );

    if (updatedComment[0] === 0) {
      throw new InternalError("Falha ao atualizar comentario!");
    }

    return Number(updatedComment);
  }
}
