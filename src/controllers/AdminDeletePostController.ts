import { Request, Response } from "express";

import { validateHandleAdminDeletePost } from "../validations/validateAdminData";

import AdminDeletePostService from "../services/AdminDeletePostService";

import IAdminDeletePostService from "../interfaces/IAdminDeletePostService";

export default class AdminDeletePostController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = validateHandleAdminDeletePost(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const postId: string = req.body.postId;

    const adminDeletePostService: IAdminDeletePostService =
      new AdminDeletePostService();

    try {
      // eslint-disable-next-line no-unused-vars
      const deletedPost: number = await adminDeletePostService.execute(postId);

      return res.status(204).send();
    } catch (err: any) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
