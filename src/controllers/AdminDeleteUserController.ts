import { Request, Response } from "express";
import ValidateAdmin from "../validations/validateAdminData";
import AdminDeleteUserService from "../services/AdminDeleteUserService";
import BadRequestError from "../errors/BadRequestError";
import GetUserEmailRepository from "../database/repositories/user/GetUserEmailRepository";
import AdminDeleteUserRepository from "../database/repositories/admin/DeleteUserRepository";

export default class AdminDeleteUserController {
  private readonly validateAdmin: ValidateAdmin;
  private readonly getUserEmailRepository: GetUserEmailRepository;
  private readonly adminDeleteUserRepository: AdminDeleteUserRepository;
  private readonly adminDeleteUserService: AdminDeleteUserService;

  constructor() {
    this.validateAdmin = new ValidateAdmin();
    this.getUserEmailRepository = new GetUserEmailRepository();
    this.adminDeleteUserRepository = new AdminDeleteUserRepository();
    this.adminDeleteUserService = new AdminDeleteUserService(
      this.getUserEmailRepository,
      this.adminDeleteUserRepository
    );
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = this.validateAdmin.validateHandleAdminDeleteUser(
      req.body
    );

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const userEmail: string = req.body.userEmail;

    try {
      await this.adminDeleteUserService.execute(userEmail);

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
