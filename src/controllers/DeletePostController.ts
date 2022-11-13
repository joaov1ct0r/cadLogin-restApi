import { Response } from "express";
import IReq from "../interfaces/IRequest";
import { validateHandleDeletePost } from "../validations/validatePostData";
import prismaClient from "../database/prismaClient";
import { Post } from "@prisma/client";
import IDeletePostController from "../interfaces/IDeletePostController";
import DeletePostService from "../services/DeletePostService";

export default class DeletePostController implements IDeletePostController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleDeletePost(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const id: string | undefined = req.userId;

    const postId: string = req.body.postId;

    const deletePostService: DeletePostService = new DeletePostService(
      prismaClient
    );

    try {
      // eslint-disable-next-line no-unused-vars
      const deletedPost: Post = await deletePostService.execute(
        Number(id),
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
