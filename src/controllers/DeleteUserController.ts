import { Response } from "express";
import IReq from "../interfaces/IRequest";
import DeleteUserService from "../services/DeleteUserService";
import DeleteUserRepository from "../database/repositories/user/DeleteUserRepository";

export default class DeleteUserController {
  private readonly deleteUserRepository: DeleteUserRepository;
  private readonly deleteUserService: DeleteUserService;

  constructor() {
    this.deleteUserRepository = new DeleteUserRepository();
    this.deleteUserService = new DeleteUserService(this.deleteUserRepository);
  }

  public async handle(req: IReq, res: Response): Promise<Response> {
    const id: string | undefined = req.userId;

    try {
      await this.deleteUserService.execute(Number(id));

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
