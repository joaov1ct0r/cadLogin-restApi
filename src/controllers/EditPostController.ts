import IReq from "../interfaces/IRequest";
import { Response } from "express";
import ValidatePost from "../validations/validatePostData";
import EditPostService from "../services/EditPostService";
import BadRequestError from "../errors/BadRequestError";
import UpdatePostRepository from "../database/repositories/post/UpdatePostRepository";
import GetPostIdRepository from "../database/repositories/post/GetPostIdRepository";

export default class EditPostController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = new ValidatePost().validateHandleEditPost(req.body);

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const postId: string = req.body.postId;

    const content: string = req.body.content;

    const id: string | undefined = req.userId;

    const updatePostRepository: UpdatePostRepository =
      new UpdatePostRepository();

    const getPostIdRepository: GetPostIdRepository = new GetPostIdRepository();

    const editPostService: EditPostService = new EditPostService(
      getPostIdRepository,
      updatePostRepository
    );
    try {
      await editPostService.execute(Number(id), Number(postId), content);

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
