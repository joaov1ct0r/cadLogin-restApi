import { Response } from "express";
import IReq from "../interfaces/IRequest";
import ValidatePost from "../validations/validatePostData";
import CreateNewPostService from "../services/CreateNewPostService";
import { Post } from "@prisma/client";
import BadRequestError from "../errors/BadRequestError";
import CreateNewPostRepository from "../database/repositories/post/CreateNewPostRepository";
import GetUserIdRepository from "../database/repositories/user/GetUserIdRepository";

export default class CreateNewPostController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = new ValidatePost().validateHandleNewPost(req.body);

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const id: string | undefined = req.userId;

    const content: string = req.body.content;

    const createNewPostRepository: CreateNewPostRepository =
      new CreateNewPostRepository();

    const getUserIdRepository: GetUserIdRepository = new GetUserIdRepository();

    const createNewPostService: CreateNewPostService = new CreateNewPostService(
      createNewPostRepository,
      getUserIdRepository
    );

    try {
      const post: Post = await createNewPostService.execute(
        Number(id),
        content
      );

      return res.status(201).json({ post, status: 201 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
