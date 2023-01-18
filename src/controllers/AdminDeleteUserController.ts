import { Request, Response } from "express";
import ValidateAdmin from "../validations/validateAdminData";
import AdminDeleteUserService from "../services/AdminDeleteUserService";
import BadRequestError from "../errors/BadRequestError";
import GetUserEmailRepository from "../database/repositories/user/GetUserEmailRepository";
import AdminDeleteUserRepository from "../database/repositories/admin/DeleteUserRepository";

export default class AdminDeleteUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = new ValidateAdmin().validateHandleAdminDeleteUser(
      req.body
    );

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const userEmail: string = req.body.userEmail;

    const getUserEmailRepository: GetUserEmailRepository =
      new GetUserEmailRepository();

    const adminDeleteUserRepository: AdminDeleteUserRepository =
      new AdminDeleteUserRepository();

    const adminDeleteUserService: AdminDeleteUserService =
      new AdminDeleteUserService(
        getUserEmailRepository,
        adminDeleteUserRepository
      );

    try {
      await adminDeleteUserService.execute(userEmail);

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
