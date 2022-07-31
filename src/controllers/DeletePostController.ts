import { Response } from "express";

import IReq from "../interfaces/requestInterface";

import { validateHandleDeletePost } from "../validations/validatePostData";

import DeletePostService from "../services/DeletePostService";

import IDeletePostService from "../interfaces/IDeletePostService";

export default class DeletePostController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleDeletePost(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const id: string | undefined = req.userId;

    const postId: string = req.body.postId;

    const deletePostService: IDeletePostService = new DeletePostService();

    try {
      // eslint-disable-next-line no-unused-vars
      const deletedPost: number = await deletePostService.execute(id, postId);

      return res.status(204).send();
    } catch (err: any) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
