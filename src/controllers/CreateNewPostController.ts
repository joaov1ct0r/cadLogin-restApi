import { Response } from "express";
import IReq from "../interfaces/IRequest";
import { validateHandleNewPost } from "../validations/validatePostData";
import CreateNewPostService from "../services/CreateNewPostService";
import prismaClient from "../database/prismaClient";
import { Post } from "@prisma/client";
import ICreateNewPostController from "../interfaces/ICreateNewPostController";

export default class CreateNewPostController
  implements ICreateNewPostController
{
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleNewPost(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const id: string | undefined = req.userId;

    const content: string = req.body.content;

    const createNewPostService: CreateNewPostService = new CreateNewPostService(
      prismaClient
    );

    try {
      const post: Post = await createNewPostService.execute(
        Number(id),
        content
      );

      return res.status(201).json({ post, status: 201 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: 201 });
    }
  }
}
