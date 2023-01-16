import IReq from "../interfaces/IRequest";
import { Response } from "express";
import ValidatePost from "../validations/validatePostData";
import DeletePostLikeService from "../services/DeletePostLikeService";
import BadRequestError from "../errors/BadRequestError";
import GetPostIdRepository from "../database/repositories/post/GetPostIdRepository";
import GetLikeIdRepository from "../database/repositories/likes/GetLikeIdRepository";
import DeleteLikeRepository from "../database/repositories/likes/DeleteLikeRepository";

export default class DeletePostLikeController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = new ValidatePost().validateHandleDeletePostLike(req.body);

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const userId: string | undefined = req.userId;

    const postId: string = req.body.postId;

    const getPostIdRepository: GetPostIdRepository = new GetPostIdRepository();

    const getLikeIdRepository: GetLikeIdRepository = new GetLikeIdRepository();

    const deleteLikeRepository: DeleteLikeRepository =
      new DeleteLikeRepository();

    const deletePostLikeService: DeletePostLikeService =
      new DeletePostLikeService(
        getPostIdRepository,
        getLikeIdRepository,
        deleteLikeRepository
      );

    try {
      await deletePostLikeService.execute(Number(userId), Number(postId));

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
