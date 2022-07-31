export default class PostController {
  async handleEditPostComment(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleEditPostComment(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const postId: string = req.body.postId;

    const commentId: string = req.body.commentId;

    const comment: string = req.body.comment;

    const userId: string | undefined = req.userId;

    try {
      const isPostRegistered: IPost | null = await Post.findOne({
        where: { id: postId },
      });

      if (isPostRegistered === null) {
        return res.status(404).json({ error: "Post não encontrado!" });
      }

      const isCommentRegistered: IComments | null = await Comments.findOne({
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
        return res.status(404).json({ error: "Comentario não encontrado!" });
      }

      const user: IUser | null = await User.findOne({
        where: {
          id: userId,
        },
      });

      const updatedComment: [affectedCount: number] = await Comments.update(
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
        return res
          .status(500)
          .json({ error: "Falha ao atualizar comentario!" });
      }

      return res.status(204).send();
    } catch (err: unknown) {
      return res.status(500).json({ err });
    }
  }

  async handleDeletePostComment(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleDeletePostComment(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const postId: string = req.body.postId;

    const commentId: string = req.body.commentId;

    const userId: string | undefined = req.userId;

    try {
      const isPostRegistered: IPost | null = await Post.findOne({
        where: { id: postId },
      });

      if (isPostRegistered === null) {
        return res.status(404).json({ error: "Post não encontrado!" });
      }

      const isCommentRegistered: IComments | null = await Comments.findOne({
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
        return res.status(404).json({ error: "Comentario não encontrado!" });
      }

      const deletedComment: number = await Comments.destroy({
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
        return res.status(500).json({ error: "Falha ao deletar comentario!" });
      }

      return res.status(204).send();
    } catch (err: unknown) {
      return res.status(500).json({ err });
    }
  }
}
