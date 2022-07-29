import { Response } from "express";

import IReq from "../interfaces/requestInterface";

import DeleteUserService from "../services/DeleteUserService";

import IDeleteUserService from "../interfaces/IDeleteUserService";

export default class DeleteUserController {
  async handle(req: IReq, res: Response): Promise<Response> {
    const id: string | undefined = req.userId;

    const deleteUserService: IDeleteUserService = new DeleteUserService();

    try {
      const deletedUser = await deleteUserService.execute(id);

      if (deletedUser <= 0) {
        return res.status(500).json({ error: "Falha ao deletar usuario!" });
      }

      return res.status(204).send();
    } catch (err: unknown) {
      return res.status(500).json({ err });
    }
  }
}
