import { Response } from "express";
import IReq from "../interfaces/IRequest";
import ValidatePost from "../validations/validatePostData";
import AddPostLikeService from "../services/AddPostLikeService";
import { Likes } from "@prisma/client";
import BadRequestError from "../errors/BadRequestError";
import GetPostIdRepository from "../database/repositories/post/GetPostIdRepository";
import GetUserIdRepository from "../database/repositories/user/GetUserIdRepository";
import GetLikeIdRepository from "../database/repositories/likes/GetLikeIdRepository";
import CreateLikeRepository from "../database/repositories/likes/CreateLikeRepository";

export default class AddPostLikeController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = new ValidatePost().validateHandleAddPostLike(req.body);

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const id: string | undefined = req.userId;

    const postId: string = req.body.postId;

    const getPostIdRepository: GetPostIdRepository = new GetPostIdRepository();

    const getUserIdRepository: GetUserIdRepository = new GetUserIdRepository();

    const getLikeIdRepository: GetLikeIdRepository = new GetLikeIdRepository();

    const createLikeRepository: CreateLikeRepository =
      new CreateLikeRepository();

    const addPostLikeService: AddPostLikeService = new AddPostLikeService(
      getPostIdRepository,
      getUserIdRepository,
      getLikeIdRepository,
      createLikeRepository
    );

    try {
      const like: Likes = await addPostLikeService.execute(
        Number(postId),
        Number(id)
      );

      return res.status(201).json({ like, status: 201 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
