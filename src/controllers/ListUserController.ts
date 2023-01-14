import { Request, Response } from "express";
import ValidateUser from "../validations/validateUserData";
import ListUserService from "../services/ListUserService";
import { User } from "@prisma/client";
import BadRequestError from "../errors/BadRequestError";
import GetUserEmailRepository from "../database/repositories/user/GetUserEmailRepository";

export default class ListUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = new ValidateUser().validateHandleOneUser(req.body);

    if (error) {
      const err = new BadRequestError(error.message);

      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const email: string = req.body.email;

    const getUserEmailRepository: GetUserEmailRepository =
      new GetUserEmailRepository();

    const listUserService: ListUserService = new ListUserService(
      getUserEmailRepository
    );

    try {
      const user: User = await listUserService.execute(email);

      return res.status(200).json({ user, status: 200 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
