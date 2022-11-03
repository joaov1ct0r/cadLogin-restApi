import { Request, Response } from "express";

import { validateHandleAdminDeleteUser } from "../validations/validateAdminData";

import AdminDeleteUserService from "../services/AdminDeleteUserService";

import IAdminDeleteUserService from "../interfaces/IAdminDeleteUserService";

import IAdminDeleteUserController from "../interfaces/IAdminDeleteUserController";

import User from "../database/models/userModel";

import Post from "../database/models/postModel";

export default class AdminDeleteUserController
  implements IAdminDeleteUserController
{
  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = validateHandleAdminDeleteUser(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const userEmail: string = req.body.userEmail;

    const adminDeleteUserService: IAdminDeleteUserService =
      new AdminDeleteUserService(User, Post);

    try {
      // eslint-disable-next-line no-unused-vars
      const deletedUser: number = await adminDeleteUserService.execute(
        userEmail
      );

      return res.status(204).json({ message: "User deletado", status: 204 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
