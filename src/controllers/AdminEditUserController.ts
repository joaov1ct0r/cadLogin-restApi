import { Request, Response } from "express";
import ValidateAdmin from "../validations/validateAdminData";
import AdminEditUserService from "../services/AdminEditUserService";
import BadRequestError from "../errors/BadRequestError";
import GetUserEmailRepository from "../database/repositories/user/GetUserEmailRepository";
import EditUserRepository from "../database/repositories/admin/EditUserRepository";

export default class AdminEditUserController {
  private readonly validateAdmin: ValidateAdmin;
  private readonly getUserEmailRepository: GetUserEmailRepository;
  private readonly editUserRepository: EditUserRepository;
  private readonly adminEditUserService: AdminEditUserService;

  constructor() {
    this.validateAdmin = new ValidateAdmin();
    this.getUserEmailRepository = new GetUserEmailRepository();
    this.editUserRepository = new EditUserRepository();
    this.adminEditUserService = new AdminEditUserService(
      this.getUserEmailRepository,
      this.editUserRepository
    );
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = new ValidateAdmin().validateHandleAdminEditUser(req.body);

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const userEmail: string = req.body.userEmail;

    const userNewEmail: string = req.body.userNewEmail;

    const userNewPassword: string = req.body.userNewPassword;

    const userNewName: string = req.body.userNewName;

    const userNewBornAt: string = req.body.userNewBornAt;

    try {
      await this.adminEditUserService.execute(
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
