import { Response } from "express";

import IReq from "../interfaces/IRequest";

import { validateHandleDeletePost } from "../validations/validatePostData";

import DeletePostService from "../services/DeletePostService";

import IDeletePostService from "../interfaces/IDeletePostService";

import IDeletePostController from "../interfaces/IDeletePostController";

import Post from "../database/models/postModel";

import Comments from "../database/models/commentsModel";

import Likes from "../database/models/likesModel";

export default class DeletePostController implements IDeletePostController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleDeletePost(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const id: string | undefined = req.userId;

    const postId: string = req.body.postId;

    const deletePostService: IDeletePostService = new DeletePostService(
      Post,
      Comments,
      Likes
    );

    try {
      // eslint-disable-next-line no-unused-vars
      const deletedPost: number = await deletePostService.execute(id, postId);

      return res.status(204).json({ message: "Post deletado", status: 204 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
