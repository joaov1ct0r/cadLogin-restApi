import IReq from "../interfaces/IRequest";

import { Response } from "express";

import { validateHandleDeletePostComment } from "../validations/validatePostData";

import Post from "../database/models/postModel";

import Comments from "../database/models/commentsModel";

import DeletePostCommentService from "../services/DeletePostCommentService";

import IDeletePostCommentService from "../interfaces/IDeletePostCommentService";

import IDeletePostCommentController from "../interfaces/IDeletePostCommentController";

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

    const deletePostCommentService: IDeletePostCommentService =
      new DeletePostCommentService(Post, Comments);

    try {
      // eslint-disable-next-line no-unused-vars
      const deletedComment: number = await deletePostCommentService.execute(
        userId,
        postId,
        commentId
      );

      return res.status(204).json({ message: "Comment deletado", status: 204 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
