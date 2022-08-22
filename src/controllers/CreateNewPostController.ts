import { Response } from "express";

import IReq from "../interfaces/IRequest";

import { validateHandleNewPost } from "../validations/validatePostData";

import CreateNewPostService from "../services/CreateNewPostService";

import ICreateNewPostService from "../interfaces/ICreateNewPostService";

import IPost from "../interfaces/IPost";

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

    const createNewPostService: ICreateNewPostService =
      new CreateNewPostService();

    try {
      const post: IPost = await createNewPostService.execute(id, content);

      return res.status(201).json({ post });
    } catch (err: any) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
