import { Request, Response } from "express";

import CreateUserService from "../services/CreateUserService";

import ICreateUserService from "../types/createUserServiceInterface";

export default class CreateUserController {
  async execute(req: Request, res: Response): Promise<Response> {
    const email: string = req.body.email;

    const password: string = req.body.password;

    const name: string = req.body.name;

    const bornAt: string = req.body.bornAt;

    const createUserService: ICreateUserService = new CreateUserController();

    const user = await createUserService.execute(email, password, name, bornAt);
  }
}
