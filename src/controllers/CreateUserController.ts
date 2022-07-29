import { Request, Response } from "express";

import CreateUserService from "../services/CreateUserService";

import ICreateUserService from "../types/CreateUserServiceInterface";

import { validateHandleUserRegister } from "../validations/validateUserData";

import IUser from "../types/userInterface";

export default class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { error } = validateHandleUserRegister(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const email: string = req.body.email;

    const password: string = req.body.password;

    const name: string = req.body.name;

    const bornAt: string = req.body.bornAt;

    const createUserService: ICreateUserService = new CreateUserService();

    try {
      const user: IUser = await createUserService.execute({
        email,
        password,
        name,
        bornAt,
      });

      return res.json({ user });
    } catch (err: unknown) {
      return res.status(500).json({ err });
    }
  }
}
