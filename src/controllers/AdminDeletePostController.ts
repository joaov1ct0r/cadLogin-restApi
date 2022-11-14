import { Request, Response } from "express";
import { validateHandleAdminDeletePost } from "../validations/validateAdminData";
import AdminDeletePostService from "../services/AdminDeletePostService";
import IAdminDeletePostController from "../interfaces/IAdminDeletePostController";
import prismaClient from "../database/prismaClient";

export default class AdminDeletePostController
  implements IAdminDeletePostController
{
  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = validateHandleAdminDeletePost(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const postId: string = req.body.postId;

    const adminDeletePostService: AdminDeletePostService =
      new AdminDeletePostService(prismaClient);

    try {
      // eslint-disable-next-line no-unused-vars
      const deletedPost: Object = await adminDeletePostService.execute(
        Number(postId)
      );

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
