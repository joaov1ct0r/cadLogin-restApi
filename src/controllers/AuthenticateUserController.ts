import { Request, Response } from "express";
import ValidateUser from "../validations/validateUserData";
import AuthenticateUserService from "../services/AuthenticateUserService";
import GetUserEmailRepository from "../database/repositories/user/GetUserEmailRepository";
import BadRequestError from "../errors/BadRequestError";

export default class AuthenticateUserController {
  private readonly validateUser: ValidateUser;
  private readonly getUserEmailRepository: GetUserEmailRepository;
  private readonly authenticateUserService: AuthenticateUserService;

  constructor() {
    this.validateUser = new ValidateUser();
    this.getUserEmailRepository = new GetUserEmailRepository();
    this.authenticateUserService = new AuthenticateUserService(
      this.getUserEmailRepository
    );
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = this.validateUser.validateHandleUserLogin(req.body);

    if (error) {
      const err = new BadRequestError(error.message);
      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const email: string = req.body.email;

    const password: string = req.body.password;

    try {
      const token: string = await this.authenticateUserService.execute(
        email,
        password
      );

      res.cookie("authorization", `Bearer ${token}`, { httpOnly: true });

      return res
        .status(200)
        .json({ message: "Login realizado com sucesso!", status: 200 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
