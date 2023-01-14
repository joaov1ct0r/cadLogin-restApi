import { Response } from "express";
import IReq from "../interfaces/IRequest";
import ValidatePost from "../validations/validatePostData";
import DeletePostService from "../services/DeletePostService";
import BadRequestError from "../errors/BadRequestError";
import GetPostIdRepository from "../database/repositories/post/GetPostIdRepository";
import DeletePostRepository from "../database/repositories/post/DeletePostRepository";

export default class DeletePostController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = new ValidatePost().validateHandleDeletePost(req.body);

    if (error) {
      const err = new BadRequestError(error.message);

      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const id: string | undefined = req.userId;

    const postId: string = req.body.postId;

    const getPostIdRepository: GetPostIdRepository = new GetPostIdRepository();

    const deletePostRepository: DeletePostRepository =
      new DeletePostRepository();

    const deletePostService: DeletePostService = new DeletePostService(
      getPostIdRepository,
      deletePostRepository
    );

    try {
      await deletePostService.execute(Number(id), Number(postId));

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
