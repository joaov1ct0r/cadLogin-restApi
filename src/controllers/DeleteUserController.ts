import { Response } from "express";

import IReq from "../interfaces/IRequest";

import User from "../database/models/userModel";

import Post from "../database/models/postModel";

import DeleteUserService from "../services/DeleteUserService";

import IDeleteUserService from "../interfaces/IDeleteUserService";

import IDeleteUserController from "../interfaces/IDeleteUserController";

export default class DeleteUserController implements IDeleteUserController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const id: string | undefined = req.userId;

    const deleteUserService: IDeleteUserService = new DeleteUserService(
      User,
      Post
    );

    try {
      // eslint-disable-next-line no-unused-vars
      const deletedUser = await deleteUserService.execute(id);

      return res.status(204).json({ message: "User deletado", status: 204 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
