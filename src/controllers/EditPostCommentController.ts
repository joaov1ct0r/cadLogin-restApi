import IReq from "../interfaces/IRequest";
import { Response } from "express";
import ValidatePost from "../validations/validatePostData";
import EditPostCommentService from "../services/EditPostCommentService";
import BadRequestError from "../errors/BadRequestError";
import GetPostIdRepository from "../database/repositories/post/GetPostIdRepository";
import GetCommentRepository from "../database/repositories/comment/GetCommentRepository";
import GetUserIdRepository from "../database/repositories/user/GetUserIdRepository";
import UpdateCommentRepository from "../database/repositories/comment/UpdateCommentRepository";

export default class EditPostCommentController {
  private readonly validatePost: ValidatePost;
  private readonly getPostIdRepository: GetPostIdRepository;
  private readonly getCommentRepository: GetCommentRepository;
  private readonly getUserIdRepository: GetUserIdRepository;
  private readonly updateCommentRepository: UpdateCommentRepository;
  private readonly editPostCommentService: EditPostCommentService;

  constructor() {
    this.validatePost = new ValidatePost();
    this.getPostIdRepository = new GetPostIdRepository();
    this.getCommentRepository = new GetCommentRepository();
    this.getUserIdRepository = new GetUserIdRepository();
    this.updateCommentRepository = new UpdateCommentRepository();
    this.editPostCommentService = new EditPostCommentService(
      this.getPostIdRepository,
      this.getCommentRepository,
      this.getUserIdRepository,
      this.updateCommentRepository
    );
  }

  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = this.validatePost.validateHandleEditPostComment(req.body);

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const postId: string = req.body.postId;

    const commentId: string = req.body.commentId;

    const comment: string = req.body.comment;

    const userId: string | undefined = req.userId;

    try {
      await this.editPostCommentService.execute(
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
