import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ValidateUser from "../validations/validateUserData";
import { User } from "@prisma/client";
import BadRequestError from "../errors/BadRequestError";
import GetUserEmailRepository from "../database/repositories/user/GetUserEmailRepository";
import CreateUserRepository from "../database/repositories/user/CreateUserRepository";

export default class CreateUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = new ValidateUser().validateHandleUserRegister(req.body);

    if (error) {
      const err = new BadRequestError(error.message);

      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const email: string = req.body.email;

    const password: string = req.body.password;

    const name: string = req.body.name;

    const bornAt: string = req.body.bornAt;

    const getUserEmailRepository: GetUserEmailRepository =
      new GetUserEmailRepository();

    const createUserRepository: CreateUserRepository =
      new CreateUserRepository();

    const createUserService: CreateUserService = new CreateUserService(
      getUserEmailRepository,
      createUserRepository
    );

    try {
      const user: User = await createUserService.execute({
        email,
        password,
        name,
        bornAt,
      });

      return res.status(201).json({ user, status: 201 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
