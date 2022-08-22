import IReq from "../interfaces/IRequest";

import { Response } from "express";

import { validateHandleEditPost } from "../validations/validatePostData";

import EditPostService from "../services/EditPostService";

import IEditPostService from "../interfaces/IEditPostService";

import IEditPostController from "../interfaces/IEditPostController";

export default class EditPostController implements IEditPostController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleEditPost(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const postId: string = req.body.postId;

    const content: string = req.body.content;

    const id: string | undefined = req.userId;

    const editPostService: IEditPostService = new EditPostService();
    try {
      // eslint-disable-next-line no-unused-vars
      const isPostEdited: number = await editPostService.execute(
        id,
        postId,
        content
      );

      return res.status(204).send();
    } catch (err: any) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
