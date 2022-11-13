import { Request, Response } from "express";
import ListAllPostsService from "../services/ListAllPostsService";
import IListAllPostsController from "../interfaces/IListAllPostsController";
import { Post } from "@prisma/client";
import prismaClient from "../database/prismaClient";

export default class ListAllPostsController implements IListAllPostsController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listAllPostsService: ListAllPostsService = new ListAllPostsService(
      prismaClient
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
