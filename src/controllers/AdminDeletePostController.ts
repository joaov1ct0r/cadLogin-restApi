import { Request, Response } from "express";
import ValidateAdmin from "../validations/validateAdminData";
import AdminDeletePostService from "../services/AdminDeletePostService";
import BadRequestError from "../errors/BadRequestError";
import GetPostIdRepository from "../database/repositories/post/GetPostIdRepository";
import DeletePostRepository from "../database/repositories/admin/DeletePostRepository";

export default class AdminDeletePostController {
  private readonly validateAdmin: ValidateAdmin;
  private readonly getPostIdRepository: GetPostIdRepository;
  private readonly deletePostRepository: DeletePostRepository;
  private readonly adminDeletePostService: AdminDeletePostService;

  constructor() {
    this.validateAdmin = new ValidateAdmin();
    this.getPostIdRepository = new GetPostIdRepository();
    this.deletePostRepository = new DeletePostRepository();
    this.adminDeletePostService = new AdminDeletePostService(
      this.getPostIdRepository,
      this.deletePostRepository
    );
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = this.validateAdmin.validateHandleAdminDeletePost(
      req.body
    );

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const postId: string = req.body.postId;

    try {
      await this.adminDeletePostService.execute(Number(postId));

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
