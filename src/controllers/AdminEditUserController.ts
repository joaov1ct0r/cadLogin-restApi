import { Request, Response } from "express";
import { validateHandleAdminEditUser } from "../validations/validateAdminData";
import AdminEditUserService from "../services/AdminEditUserService";
import IAdminEditUserController from "../interfaces/IAdminEditUserController";
import prismaClient from "../database/prismaClient";

export default class AdminEditUserController
  implements IAdminEditUserController
{
  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = validateHandleAdminEditUser(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const userEmail: string = req.body.userEmail;

    const userNewEmail: string = req.body.userNewEmail;

    const userNewPassword: string = req.body.userNewPassword;

    const userNewName: string = req.body.userNewName;

    const userNewBornAt: string = req.body.userNewBornAt;

    const adminEditUserService: AdminEditUserService = new AdminEditUserService(
      prismaClient
    );

    try {
      // eslint-disable-next-line no-unused-vars
      const updatedUser: Object = await adminEditUserService.execute(
        userEmail,
        userNewEmail,
        userNewPassword,
        userNewName,
        userNewBornAt
      );

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
