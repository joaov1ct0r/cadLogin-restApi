import { Response } from "express";
import IReq from "../interfaces/IRequest";
import prismaClient from "../database/prismaClient";
import DeleteUserService from "../services/DeleteUserService";
import IDeleteUserController from "../interfaces/IDeleteUserController";

export default class DeleteUserController implements IDeleteUserController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const id: string | undefined = req.userId;

    const deleteUserService: DeleteUserService = new DeleteUserService(
      prismaClient
    );

    try {
      // eslint-disable-next-line no-unused-vars
      const deletedUser = await deleteUserService.execute(Number(id));

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
