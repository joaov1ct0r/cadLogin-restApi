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
  private readonly validatePost: ValidatePost;
  private readonly getPostIdRepository: GetPostIdRepository;
  private readonly getUserIdRepository: GetUserIdRepository;
  private readonly createCommentRepository: CreateCommentRepository;
  private readonly addPostCommentService: AddPostCommentService;

  constructor() {
    this.validatePost = new ValidatePost();
    this.getPostIdRepository = new GetPostIdRepository();
    this.getUserIdRepository = new GetUserIdRepository();
    this.createCommentRepository = new CreateCommentRepository();
    this.addPostCommentService = new AddPostCommentService(
      this.getPostIdRepository,
      this.getUserIdRepository,
      this.createCommentRepository
    );
  }

  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = this.validatePost.validateHandleAddPostComment(req.body);

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const postId: string = req.body.postId;

    const comment: string = req.body.comment;

    const id: string | undefined = req.userId;

    try {
      const newComment: Comment = await this.addPostCommentService.execute(
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
