import IReq from "../interfaces/IRequest";
import { Response } from "express";
import { validateHandleEditPostComment } from "../validations/validatePostData";
import EditPostCommentService from "../services/EditPostCommentService";
import IEditPostCommentController from "../interfaces/IEditPostCommentController";
import prismaClient from "../database/prismaClient";

export default class EditPostCommentController
  implements IEditPostCommentController
{
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleEditPostComment(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const postId: string = req.body.postId;

    const commentId: string = req.body.commentId;

    const comment: string = req.body.comment;

    const userId: string | undefined = req.userId;

    const editPostCommentService: EditPostCommentService =
      new EditPostCommentService(prismaClient);

    try {
      // eslint-disable-next-line no-unused-vars
      const editedComment: Object = await editPostCommentService.execute(
        Number(userId),
        Number(postId),
        Number(commentId),
        comment
      );

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
