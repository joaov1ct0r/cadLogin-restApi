import { Response } from "express";
import IReq from "../interfaces/IRequest";
import ValidateUser from "../validations/validateUserData";
import EditUserService from "../services/EditUserService";
import BadRequestError from "../errors/BadRequestError";
import EditUserRepository from "../database/repositories/user/EditUserRepository";

export default class EditUserController {
  public async handle(req: IReq, res: Response): Promise<Response> {
    const { error } = new ValidateUser().validateHandleUserEdit(req.body);

    if (error) {
      const err = new BadRequestError(error.message);

      return res.status(err.statusCode).json({ error, status: err.statusCode });
    }

    const email: string = req.body.email;

    const password: string = req.body.password;

    const name: string = req.body.name;

    const bornAt: string = req.body.bornAt;

    const id: string | undefined = req.userId;

    const editUserRepository: EditUserRepository = new EditUserRepository();

    const editUserService: EditUserService = new EditUserService(
      editUserRepository
    );

    try {
      await editUserService.execute(email, password, name, bornAt, Number(id));

      return res.status(204).send();
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
