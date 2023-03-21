import { Response } from "express";
import IReq from "../interfaces/IRequest";
import ValidatePost from "../validations/validatePostData";
import AddPostLikeService from "../services/AddPostLikeService";
import { Likes } from "@prisma/client";
import BadRequestError from "../errors/BadRequestError";
import GetPostIdRepository from "../database/repositories/post/GetPostIdRepository";
import GetUserIdRepository from "../database/repositories/user/GetUserIdRepository";
import GetLikeIdRepository from "../database/repositories/likes/GetLikeIdRepository";
import CreateLikeRepository from "../database/repositories/likes/CreateLikeRepository";

export default class AddPostLikeController {
  private readonly validatePost: ValidatePost;
  private readonly getPostIdRepository: GetPostIdRepository;
  private readonly getUserIdRepository: GetUserIdRepository;
  private readonly getLikeIdRepository: GetLikeIdRepository;
  private readonly createLikeRepository: CreateLikeRepository;
  private readonly addPostLikeService: AddPostLikeService;

  constructor() {
    this.validatePost = new ValidatePost();
    this.getPostIdRepository = new GetPostIdRepository();
    this.getUserIdRepository = new GetUserIdRepository();
    this.getLikeIdRepository = new GetLikeIdRepository();
    this.createLikeRepository = new CreateLikeRepository();
    this.addPostLikeService = new AddPostLikeService(
      this.getPostIdRepository,
      this.getUserIdRepository,
      this.getLikeIdRepository,
      this.createLikeRepository
    );
  }

  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = this.validatePost.validateHandleAddPostLike(req.body);

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const id: string | undefined = req.userId;

    const postId: string = req.body.postId;

    try {
      const like: Likes = await this.addPostLikeService.execute(
        Number(postId),
        Number(id)
      );

      return res.status(201).json({ like, status: 201 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
