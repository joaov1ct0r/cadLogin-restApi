import { Request, Response } from "express";
import ValidatePost from "../validations/validatePostData";
import ListPostService from "../services/ListPostService";
import { Post } from "@prisma/client";
import BadRequestError from "../errors/BadRequestError";
import ListPostRepository from "../database/repositories/post/ListPostRepository";

export default class ListPostController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = new ValidatePost().validateHandleOnePost(req.body);

    if (error) {
      const err = new BadRequestError(error.message);

      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const postId: string = req.body.postId;

    const listPostRepository: ListPostRepository = new ListPostRepository();

    const listPostService: ListPostService = new ListPostService(
      listPostRepository
    );

    try {
      const post: Post = await listPostService.execute(Number(postId));

      return res.status(200).json({ post, status: 200 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
