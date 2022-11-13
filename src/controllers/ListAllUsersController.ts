import { Request, Response } from "express";
import ListAllUsersService from "../services/ListAllUsersService";
import IListAllUsersController from "../interfaces/IListAllUsersController";
import prismaClient from "../database/prismaClient";
import { User } from "@prisma/client";

export default class ListAllUsersController implements IListAllUsersController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listAllUsersService: ListAllUsersService = new ListAllUsersService(
      prismaClient
    );

    try {
      const users: User[] = await listAllUsersService.execute();

      return res.status(200).json({ users, status: 200 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
