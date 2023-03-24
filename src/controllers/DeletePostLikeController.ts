import IReq from "../interfaces/IRequest";
import { Response } from "express";
import ValidatePost from "../validations/validatePostData";
import DeletePostLikeService from "../services/DeletePostLikeService";
import BadRequestError from "../errors/BadRequestError";
import GetPostIdRepository from "../database/repositories/post/GetPostIdRepository";
import GetLikeIdRepository from "../database/repositories/likes/GetLikeIdRepository";
import DeleteLikeRepository from "../database/repositories/likes/DeleteLikeRepository";

export default class DeletePostLikeController {
  private readonly validatePost: ValidatePost;
  private readonly getPostIdRepository: GetPostIdRepository;
  private readonly getLikeIdRepository: GetLikeIdRepository;
  private readonly deleteLikeRepository: DeleteLikeRepository;
  private readonly deletePostLikeService: DeletePostLikeService;

  constructor() {
    this.validatePost = new ValidatePost();
    this.getPostIdRepository = new GetPostIdRepository();
    this.getLikeIdRepository = new GetLikeIdRepository();
    this.deleteLikeRepository = new DeleteLikeRepository();
    this.deletePostLikeService = new DeletePostLikeService(
      this.getPostIdRepository,
      this.getLikeIdRepository,
      this.deleteLikeRepository
    );
  }

  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = this.validatePost.validateHandleDeletePostLike(req.body);

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const userId: string | undefined = req.userId;

    const postId: string = req.body.postId;

    try {
      await this.deletePostLikeService.execute(Number(userId), Number(postId));

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
