import { Request, Response } from "express";
import { validateHandleAdminDeleteUser } from "../validations/validateAdminData";
import AdminDeleteUserService from "../services/AdminDeleteUserService";
import IAdminDeleteUserController from "../interfaces/IAdminDeleteUserController";
import prismaClient from "../database/prismaClient";

export default class AdminDeleteUserController
  implements IAdminDeleteUserController
{
  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = validateHandleAdminDeleteUser(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const userEmail: string = req.body.userEmail;

    const adminDeleteUserService: AdminDeleteUserService =
      new AdminDeleteUserService(prismaClient);

    try {
      // eslint-disable-next-line no-unused-vars
      const deletedUser: Object = await adminDeleteUserService.execute(
        userEmail
      );

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
