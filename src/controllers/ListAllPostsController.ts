import { Request, Response } from "express";

import IPost from "../interfaces/IPost";

import ListAllPostsService from "../services/ListAllPostsService";

import IListAllPostsService from "../interfaces/IListAllPostsService";

import IListAllPostsController from "../interfaces/IListAllPostsController";

export default class ListAllPostsController implements IListAllPostsController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listAllPostsService: IListAllPostsService = new ListAllPostsService();
    try {
      const posts: IPost[] = await listAllPostsService.execute();

      return res.status(200).json({ posts });
    } catch (err: any) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
