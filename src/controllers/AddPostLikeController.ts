import { Response } from "express";

import IReq from "../interfaces/IRequest";

import { validateHandleAddPostLike } from "../validations/validatePostData";

import AddPostLikeService from "../services/AddPostLikeService";

import IAddPostLikeService from "../interfaces/IAddPostLikeService";

import ILikes from "../interfaces/ILikes";

export default class AddPostLikeController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleAddPostLike(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const id: string | undefined = req.userId;

    const postId: string = req.body.postId;

    const addPostLikeService: IAddPostLikeService = new AddPostLikeService();

    try {
      const like: ILikes = await addPostLikeService.execute(postId, id);

      return res.status(201).json({ like });
    } catch (err: any) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
