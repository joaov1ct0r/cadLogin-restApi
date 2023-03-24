import { Response } from "express";
import IReq from "../interfaces/IRequest";
import ValidatePost from "../validations/validatePostData";
import DeletePostService from "../services/DeletePostService";
import BadRequestError from "../errors/BadRequestError";
import GetPostIdRepository from "../database/repositories/post/GetPostIdRepository";
import DeletePostRepository from "../database/repositories/post/DeletePostRepository";

export default class DeletePostController {
  private readonly validatePost: ValidatePost;
  private readonly getPostIdRepository: GetPostIdRepository;
  private readonly deletePostRepository: DeletePostRepository;
  private readonly deletePostService: DeletePostService;

  constructor() {
    this.validatePost = new ValidatePost();
    this.getPostIdRepository = new GetPostIdRepository();
    this.deletePostRepository = new DeletePostRepository();
    this.deletePostService = new DeletePostService(
      this.getPostIdRepository,
      this.deletePostRepository
    );
  }

  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = this.validatePost.validateHandleDeletePost(req.body);

    if (error) {
      const err = new BadRequestError(error.message);

      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const id: string | undefined = req.userId;

    const postId: string = req.body.postId;

    try {
      await this.deletePostService.execute(Number(id), Number(postId));

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
