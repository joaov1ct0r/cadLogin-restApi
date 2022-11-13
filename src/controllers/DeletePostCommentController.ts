import IReq from "../interfaces/IRequest";
import { Response } from "express";
import { validateHandleDeletePostComment } from "../validations/validatePostData";
import DeletePostCommentService from "../services/DeletePostCommentService";
import IDeletePostCommentController from "../interfaces/IDeletePostCommentController";
import prismaClient from "../database/prismaClient";

export default class DeletePostCommentController
  implements IDeletePostCommentController
{
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleDeletePostComment(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const postId: string = req.body.postId;

    const commentId: string = req.body.commentId;

    const userId: string | undefined = req.userId;

    const deletePostCommentService: DeletePostCommentService =
      new DeletePostCommentService(prismaClient);

    try {
      // eslint-disable-next-line no-unused-vars
      const deletedComment: Object = await deletePostCommentService.execute(
        Number(userId),
        Number(postId),
        Number(commentId)
      );

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
