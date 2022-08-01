import { Response } from "express";

import IReq from "../interfaces/IRequest";

import DeleteUserService from "../services/DeleteUserService";

import IDeleteUserService from "../interfaces/IDeleteUserService";

export default class DeleteUserController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const id: string | undefined = req.userId;

    const deleteUserService: IDeleteUserService = new DeleteUserService();

    try {
      // eslint-disable-next-line no-unused-vars
      const deletedUser = await deleteUserService.execute(id);

      return res.status(204).send();
    } catch (err: any) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
