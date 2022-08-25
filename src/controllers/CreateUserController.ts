import { Request, Response } from "express";

import CreateUserService from "../services/CreateUserService";

import ICreateUserService from "../interfaces/ICreateUserService";

import { validateHandleUserRegister } from "../validations/validateUserData";

import User from "../database/models/userModel";

import IUser from "../interfaces/IUser";

import ICreateUserController from "../interfaces/ICreateUserController";

export default class CreateUserController implements ICreateUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = validateHandleUserRegister(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const email: string = req.body.email;

    const password: string = req.body.password;

    const name: string = req.body.name;

    const bornAt: string = req.body.bornAt;

    const createUserService: ICreateUserService = new CreateUserService(User);

    try {
      const user: IUser = await createUserService.execute({
        email,
        password,
        name,
        bornAt,
      });

      return res.status(201).json({ user });
    } catch (err: any) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
