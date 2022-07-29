import { Request, Response } from "express";

import CreateUserService from "../services/CreateUserService";

export default class CreateUserController {
  async execute(req: Request, res: Response): Promise<Response> {
    const email: string = req.body.email;

    const password: string = req.body.password;

    const name: string = req.body.name;

    const bornAt: string = req.body.bornAt;
  }
}
