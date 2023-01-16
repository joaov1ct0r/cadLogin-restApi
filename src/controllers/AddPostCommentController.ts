import IReq from "../interfaces/IRequest";
import { Response } from "express";
import ValidatePost from "../validations/validatePostData";
import AddPostCommentService from "../services/AddPostCommentService";
import { Comment } from "@prisma/client";
import BadRequestError from "../errors/BadRequestError";
import GetPostIdRepository from "../database/repositories/post/GetPostIdRepository";
import GetUserIdRepository from "../database/repositories/user/GetUserIdRepository";
import CreateCommentRepository from "../database/repositories/comment/CreateCommentRepository";

export default class AddPostCommentController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = new ValidatePost().validateHandleAddPostComment(req.body);

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const postId: string = req.body.postId;

    const comment: string = req.body.comment;

    const id: string | undefined = req.userId;

    const getPostIdRepository: GetPostIdRepository = new GetPostIdRepository();

    const getUserIdRepository: GetUserIdRepository = new GetUserIdRepository();

    const createCommentRepository: CreateCommentRepository =
      new CreateCommentRepository();

    const addPostCommentService: AddPostCommentService =
      new AddPostCommentService(
        getPostIdRepository,
        getUserIdRepository,
        createCommentRepository
      );

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
