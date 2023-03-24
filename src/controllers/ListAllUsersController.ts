import { Request, Response } from "express";
import ListAllUsersService from "../services/ListAllUsersService";
import { User } from "@prisma/client";
import ListUsersRepository from "../database/repositories/user/ListUsersRepository";

export default class ListAllUsersController {
  private readonly listUsersRepository: ListUsersRepository;
  private readonly listAllUsersService: ListAllUsersService;

  constructor() {
    this.listUsersRepository = new ListUsersRepository();
    this.listAllUsersService = new ListAllUsersService(
      this.listUsersRepository
    );
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const users: User[] = await this.listAllUsersService.execute();

      return res.status(200).json({ users, status: 200 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
