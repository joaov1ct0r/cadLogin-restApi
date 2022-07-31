import IReq from "../interfaces/requestInterface";

import { Response } from "express";

import { validateHandleEditPostComment } from "../validations/validatePostData";

import EditPostCommentService from "../services/EditPostCommentService";

import IEditPostCommentService from "../interfaces/IEditPostCommentService";

export default class EditPostCommentController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleEditPostComment(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const postId: string = req.body.postId;

    const commentId: string = req.body.commentId;

    const comment: string = req.body.comment;

    const userId: string | undefined = req.userId;

    const editPostCommentService: IEditPostCommentService =
      new EditPostCommentService();

    try {
      // eslint-disable-next-line no-unused-vars
      const editedComment: number = await editPostCommentService.execute(
        userId,
        postId,
        commentId,
        comment
      );

      return res.status(204).send();
    } catch (err: any) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
