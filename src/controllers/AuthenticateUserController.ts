import { Request, Response } from "express";

import { validateHandleUserLogin } from "../validations/validateUserData";

import IAuthenticateUserService from "../interfaces/IAuthenticateUserService";

import AuthenticateUserService from "../services/AuthenticateUserService";

export default class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { error } = validateHandleUserLogin(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const email: string = req.body.email;

    const password: string = req.body.password;

    const authenticateUserService: IAuthenticateUserService =
      new AuthenticateUserService();

    try {
      const token: string = await authenticateUserService.execute(
        email,
        password
      );

      res.cookie("authorization", `Bearer ${token}`, { httpOnly: true });

      return res.status(200).json({ message: "Login realizado com sucesso!" });
    } catch (err: unknown) {
      return res.status(500).json({ err });
    }
  }
}
