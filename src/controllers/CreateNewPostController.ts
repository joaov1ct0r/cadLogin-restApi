import { Response } from "express";

import IReq from "../interfaces/IRequest";

import { validateHandleNewPost } from "../validations/validatePostData";

import CreateNewPostService from "../services/CreateNewPostService";

import ICreateNewPostService from "../interfaces/ICreateNewPostService";

import Post from "../database/models/postModel";

import IPost from "../interfaces/IPost";

import User from "../database/models/userModel";

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
      new CreateNewPostService(Post, User);

    try {
      const post: IPost = await createNewPostService.execute(id, content);

      return res.status(201).json({ post, status: 201 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: 201 });
    }
  }
}
