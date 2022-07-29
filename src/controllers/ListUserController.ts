import { Request, Response } from "express";

import { validateHandleOneUser } from "../validations/validateUserData";

import ListUserService from "../services/ListUserService";

import IListUserService from "../interfaces/IListUserService";

import IUser from "../interfaces/userInterface";

export default class ListUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { error } = validateHandleOneUser(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const email: string = req.body.email;

    const listUserService: IListUserService = new ListUserService();

    try {
      const user: IUser | null = await listUserService.execute(email);

      if (user === null) {
        return res.status(404).json({ error: "Usuario não encontrado!" });
      }

      return res.status(200).json({ user });
    } catch (err: unknown) {
      return res.status(500).json({ err });
    }
  }
}
