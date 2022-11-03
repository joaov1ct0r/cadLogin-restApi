import { Request, Response } from "express";

import { validateHandleOneUser } from "../validations/validateUserData";

import ListUserService from "../services/ListUserService";

import IListUserService from "../interfaces/IListUserService";

import User from "../database/models/userModel";

import IUser from "../interfaces/IUser";

import IListUserController from "../interfaces/IListUserController";

export default class ListUserController implements IListUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = validateHandleOneUser(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const email: string = req.body.email;

    const listUserService: IListUserService = new ListUserService(User);

    try {
      const user: IUser = await listUserService.execute(email);

      return res.status(200).json({ user, status: 200 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
