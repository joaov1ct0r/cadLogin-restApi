import IReq from "../interfaces/IRequest";
import { Response } from "express";
import { validateHandleAddPostComment } from "../validations/validatePostData";
import AddPostCommentService from "../services/AddPostCommentService";
import IAddPostCommentController from "../interfaces/IAddPostCommentController";
import prismaClient from "../database/prismaClient";
import { Comment } from "@prisma/client";

export default class AddPostCommentController
  implements IAddPostCommentController
{
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleAddPostComment(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const postId: string = req.body.postId;

    const comment: string = req.body.comment;

    const id: string | undefined = req.userId;

    const addPostCommentService: AddPostCommentService =
      new AddPostCommentService(prismaClient);

    try {
      const newComment: Comment = await addPostCommentService.execute(
        Number(id),
        Number(postId),
        comment
      );

      return res.status(201).json({ newComment, status: 201 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
