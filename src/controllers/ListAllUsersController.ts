import { Request, Response } from "express";

import ListAllUsersService from "../services/ListAllUsersService";

import IListAllUsersService from "../interfaces/IListAllUsersService";

import User from "../database/models/userModel";

import IUser from "../interfaces/IUser";

import IListAllUsersController from "../interfaces/IListAllUsersController";

export default class ListAllUsersController implements IListAllUsersController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listAllUsersService: IListAllUsersService = new ListAllUsersService(
      User
    );

    try {
      const users: IUser[] = await listAllUsersService.execute();

      return res.status(200).json({ users });
    } catch (err: unknown) {
      return res.status(500).json({ error: err });
    }
  }
}
