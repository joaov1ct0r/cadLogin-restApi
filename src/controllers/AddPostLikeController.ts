import { Response } from "express";
import IReq from "../interfaces/IRequest";
import { validateHandleAddPostLike } from "../validations/validatePostData";
import AddPostLikeService from "../services/AddPostLikeService";
import prismaClient from "../database/prismaClient";
import { Likes } from "@prisma/client";
import IAddPostLikeController from "../interfaces/IAddPostLikeController";

export default class AddPostLikeController implements IAddPostLikeController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleAddPostLike(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const id: string | undefined = req.userId;

    const postId: string = req.body.postId;

    const addPostLikeService: AddPostLikeService = new AddPostLikeService(
      prismaClient
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
