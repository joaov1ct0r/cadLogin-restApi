import { Request, Response } from "express";
import ListAllPostsService from "../services/ListAllPostsService";
import { Post } from "@prisma/client";
import ListAllPostsRepository from "../database/repositories/post/ListAllPostsRepository";

export default class ListAllPostsController {
  private readonly listAllPostsRepository: ListAllPostsRepository;
  private readonly listAllPostsService: ListAllPostsService;

  constructor() {
    this.listAllPostsRepository = new ListAllPostsRepository();
    this.listAllPostsService = new ListAllPostsService(
      this.listAllPostsRepository
    );
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const posts: Post[] = await this.listAllPostsService.execute();

      return res.status(200).json({ posts, status: 200 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
