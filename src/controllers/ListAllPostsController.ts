import { Request, Response } from "express";
import ListAllPostsService from "../services/ListAllPostsService";
import { Post } from "@prisma/client";
import ListAllPostsRepository from "../database/repositories/post/ListAllPostsRepository";

export default class ListAllPostsController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listAllPostsRepository: ListAllPostsRepository =
      new ListAllPostsRepository();
    const listAllPostsService: ListAllPostsService = new ListAllPostsService(
      listAllPostsRepository
    );
    try {
      const posts: Post[] = await listAllPostsService.execute();

      return res.status(200).json({ posts, status: 200 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
