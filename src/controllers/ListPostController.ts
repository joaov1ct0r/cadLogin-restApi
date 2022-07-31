import { Request, Response } from "express";

import { validateHandleOnePost } from "../validations/validatePostData";

import ListPostService from "../services/ListPostService";

import IListPostService from "../interfaces/IListPostService";

import IPost from "../interfaces/IPost";

export default class ListPostController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = validateHandleOnePost(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const postId: string = req.body.postId;

    const listPostService: IListPostService = new ListPostService();

    try {
      const post: IPost = await listPostService.execute(postId);

      return res.status(200).json({ post });
    } catch (err: any) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
