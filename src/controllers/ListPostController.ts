import { Request, Response } from "express";
import { validateHandleOnePost } from "../validations/validatePostData";
import ListPostService from "../services/ListPostService";
import IListPostController from "../interfaces/IListPostController";
import prismaClient from "../database/prismaClient";
import { Post } from "@prisma/client";

export default class ListPostController implements IListPostController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = validateHandleOnePost(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const postId: string = req.body.postId;

    const listPostService: ListPostService = new ListPostService(prismaClient);

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
