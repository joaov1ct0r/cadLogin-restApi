import { Request, Response } from "express";
import ValidateAdmin from "../validations/validateAdminData";
import AdminDeletePostService from "../services/AdminDeletePostService";
import BadRequestError from "../errors/BadRequestError";
import GetPostIdRepository from "../database/repositories/post/GetPostIdRepository";
import DeletePostRepository from "../database/repositories/admin/DeletePostRepository";

export default class AdminDeletePostController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = new ValidateAdmin().validateHandleAdminDeletePost(
      req.body
    );

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const postId: string = req.body.postId;

    const getPostIdRepository: GetPostIdRepository = new GetPostIdRepository();

    const adminDeletePostRepository: DeletePostRepository =
      new DeletePostRepository();

    const adminDeletePostService: AdminDeletePostService =
      new AdminDeletePostService(
        getPostIdRepository,
        adminDeletePostRepository
      );

    try {
      await adminDeletePostService.execute(Number(postId));

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
