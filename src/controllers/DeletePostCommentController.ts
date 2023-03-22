import IReq from "../interfaces/IRequest";
import { Response } from "express";
import ValidatePost from "../validations/validatePostData";
import DeletePostCommentService from "../services/DeletePostCommentService";
import BadRequestError from "../errors/BadRequestError";
import GetPostIdRepository from "../database/repositories/post/GetPostIdRepository";
import GetCommentRepository from "../database/repositories/comment/GetCommentRepository";
import DeleteCommentRepository from "../database/repositories/comment/DeleteCommentRepository";

export default class DeletePostCommentController {
  private readonly validatePost: ValidatePost;
  private readonly getPostIdRepository: GetPostIdRepository;
  private readonly getCommentRepository: GetCommentRepository;
  private readonly deleteCommentRepository: DeleteCommentRepository;
  private readonly deletePostCommentService: DeletePostCommentService;

  constructor() {
    this.validatePost = new ValidatePost();
    this.getPostIdRepository = new GetPostIdRepository();
    this.getCommentRepository = new GetCommentRepository();
    this.deleteCommentRepository = new DeleteCommentRepository();
    this.deletePostCommentService = new DeletePostCommentService(
      this.getPostIdRepository,
      this.getCommentRepository,
      this.deleteCommentRepository
    );
  }

  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = this.validatePost.validateHandleDeletePostComment(
      req.body
    );

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const postId: string = req.body.postId;

    const commentId: string = req.body.commentId;

    const userId: string | undefined = req.userId;

    try {
      await this.deletePostCommentService.execute(
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
