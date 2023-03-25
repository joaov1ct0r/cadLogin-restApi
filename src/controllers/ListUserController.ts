import { Request, Response } from "express";
import ValidateUser from "../validations/validateUserData";
import ListUserService from "../services/ListUserService";
import { User } from "@prisma/client";
import BadRequestError from "../errors/BadRequestError";
import GetUserEmailRepository from "../database/repositories/user/GetUserEmailRepository";

export default class ListUserController {
  private readonly validateUser: ValidateUser;
  private readonly getUserEmailRepository: GetUserEmailRepository;
  private readonly listUserService: ListUserService;

  constructor() {
    this.validateUser = new ValidateUser();
    this.getUserEmailRepository = new GetUserEmailRepository();
    this.listUserService = new ListUserService(this.getUserEmailRepository);
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = this.validateUser.validateHandleOneUser(req.params);

    if (error) {
      const err = new BadRequestError(error.message);

      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const email: string = req.body.email;

    try {
      const user: User = await this.listUserService.execute(email);

      return res.status(200).json({ user, status: 200 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
