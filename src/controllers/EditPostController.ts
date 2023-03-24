import IReq from "../interfaces/IRequest";
import { Response } from "express";
import ValidatePost from "../validations/validatePostData";
import EditPostService from "../services/EditPostService";
import BadRequestError from "../errors/BadRequestError";
import UpdatePostRepository from "../database/repositories/post/UpdatePostRepository";
import GetPostIdRepository from "../database/repositories/post/GetPostIdRepository";

export default class EditPostController {
  private readonly validatePost: ValidatePost;
  private readonly updatePostRepository: UpdatePostRepository;
  private readonly getPostIdRepository: GetPostIdRepository;
  private readonly editPostService: EditPostService;

  constructor() {
    this.validatePost = new ValidatePost();
    this.updatePostRepository = new UpdatePostRepository();
    this.getPostIdRepository = new GetPostIdRepository();
    this.editPostService = new EditPostService(
      this.getPostIdRepository,
      this.updatePostRepository
    );
  }

  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = this.validatePost.validateHandleEditPost(req.body);

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const postId: string = req.body.postId;

    const content: string = req.body.content;

    const id: string | undefined = req.userId;

    try {
      await this.editPostService.execute(Number(id), Number(postId), content);

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
