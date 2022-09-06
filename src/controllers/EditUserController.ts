import { Response } from "express";

import IReq from "../interfaces/IRequest";

import { validateHandleUserEdit } from "../validations/validateUserData";

import User from "../database/models/userModel";

import IEditUserService from "../interfaces/IEditUserService";

import EditUserService from "../services/EditUserService";

import IEditUserController from "../interfaces/IEditUserController";

export default class EditUserController implements IEditUserController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleUserEdit(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const email: string = req.body.email;

    const password: string = req.body.password;

    const name: string = req.body.name;

    const bornAt: string = req.body.bornAt;

    const id: string | undefined = req.userId;

    const editUserService: IEditUserService = new EditUserService(User);

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
