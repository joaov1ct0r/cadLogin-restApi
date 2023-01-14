import { Response } from "express";
import IReq from "../interfaces/IRequest";
import DeleteUserService from "../services/DeleteUserService";
import DeleteUserRepository from "../database/repositories/user/DeleteUserRepository";

export default class DeleteUserController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const id: string | undefined = req.userId;

    const deleteUserRepository: DeleteUserRepository =
      new DeleteUserRepository();

    const deleteUserService: DeleteUserService = new DeleteUserService(
      deleteUserRepository
    );

    try {
      await deleteUserService.execute(Number(id));

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
