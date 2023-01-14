import { Request, Response } from "express";
import ListAllUsersService from "../services/ListAllUsersService";
import { User } from "@prisma/client";
import ListUsersRepository from "../database/repositories/user/ListUsersRepository";

export default class ListAllUsersController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listUsersRepository: ListUsersRepository = new ListUsersRepository();
    const listAllUsersService: ListAllUsersService = new ListAllUsersService(
      listUsersRepository
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
