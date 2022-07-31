import { Response } from "express";

import IReq from "../interfaces/requestInterface";

import { validateHandleUserEdit } from "../validations/validateUserData";

import IEditUserService from "../interfaces/IEditUserService";

import EditUserService from "../services/EditUserService";

export default class EditUserController {
  async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleUserEdit(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const email: string = req.body.email;

    const password: string = req.body.password;

    const name: string = req.body.name;

    const bornAt: string = req.body.bornAt;

    const id: string | undefined = req.userId;

    const editUserService: IEditUserService = new EditUserService();

    try {
      // eslint-disable-next-line no-unused-vars
      const isUserEdited: number = await editUserService.execute({
        email,
        password,
        name,
        bornAt,
        id,
      });

      return res.status(204).send();
    } catch (err: any) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }
}
