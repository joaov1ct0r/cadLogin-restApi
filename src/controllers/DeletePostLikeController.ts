import IReq from "../interfaces/requestInterface";

import { Response } from "express";

import { validateHandleDeletePostLike } from "../validations/validatePostData";

import DeletePostLikeService from "../services/DeletePostLikeService";

import IDeletePostLikeService from "../interfaces/IDeletePostLikeService";

export default class DeletePostLikeController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleDeletePostLike(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const userId: string | undefined = req.userId;

    const postId: string = req.body.postId;

    const deletePostLikeService: IDeletePostLikeService =
      new DeletePostLikeService();

    try {
      // eslint-disable-next-line no-unused-vars
      const deletedLike: number = await deletePostLikeService.execute(
        userId,
        postId
      );

      return res.status(204).send();
    } catch (err: any) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
