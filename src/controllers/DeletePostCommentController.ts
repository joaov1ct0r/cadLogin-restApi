import IReq from "../interfaces/IRequest";
import { Response } from "express";
import ValidatePost from "../validations/validatePostData";
import DeletePostCommentService from "../services/DeletePostCommentService";
import BadRequestError from "../errors/BadRequestError";
import GetPostIdRepository from "../database/repositories/post/GetPostIdRepository";
import GetCommentRepository from "../database/repositories/comment/GetCommentRepository";
import DeleteCommentRepository from "../database/repositories/comment/DeleteCommentRepository";

export default class DeletePostCommentController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = new ValidatePost().validateHandleDeletePostComment(
      req.body
    );

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const postId: string = req.body.postId;

    const commentId: string = req.body.commentId;

    const userId: string | undefined = req.userId;

    const getPostIdRepository: GetPostIdRepository = new GetPostIdRepository();

    const getCommentRepository: GetCommentRepository =
      new GetCommentRepository();

    const deleteCommentRepository: DeleteCommentRepository =
      new DeleteCommentRepository();

    const deletePostCommentService: DeletePostCommentService =
      new DeletePostCommentService(
        getPostIdRepository,
        getCommentRepository,
        deleteCommentRepository
      );

    try {
      await deletePostCommentService.execute(
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
