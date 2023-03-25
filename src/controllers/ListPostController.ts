import { Request, Response } from "express";
import ValidatePost from "../validations/validatePostData";
import ListPostService from "../services/ListPostService";
import { Post } from "@prisma/client";
import BadRequestError from "../errors/BadRequestError";
import ListPostRepository from "../database/repositories/post/ListPostRepository";

export default class ListPostController {
  private readonly validatePost: ValidatePost;
  private readonly listPostRepository: ListPostRepository;
  private readonly listPostService: ListPostService;

  constructor() {
    this.validatePost = new ValidatePost();
    this.listPostRepository = new ListPostRepository();
    this.listPostService = new ListPostService(this.listPostRepository);
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = this.validatePost.validateHandleOnePost(req.params);

    if (error) {
      const err = new BadRequestError(error.message);

      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const postId: string = req.params.postId;

    try {
      const post: Post = await this.listPostService.execute(Number(postId));

      return res.status(200).json({ post, status: 200 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
