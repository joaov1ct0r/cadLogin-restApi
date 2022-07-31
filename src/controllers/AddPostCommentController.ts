import IReq from "../interfaces/IRequest";

import { Response } from "express";

import { validateHandleAddPostComment } from "../validations/validatePostData";

import AddPostCommentService from "../services/AddPostCommentService";

import IAddPostCommentService from "../interfaces/IAddPostCommentService";

import IComments from "../interfaces/IComments";

export default class AddPostCommentController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleAddPostComment(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const postId: string = req.body.postId;

    const comment: string = req.body.comment;

    const id: string | undefined = req.userId;

    const addPostCommentService: IAddPostCommentService =
      new AddPostCommentService();

    try {
      const newComment: IComments = await addPostCommentService.execute(
        id,
        postId,
        comment
      );

      return res.status(201).json({ newComment });
    } catch (err: any) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
