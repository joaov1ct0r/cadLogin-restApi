import { Request, Response } from "express";

import IReq from "./requestInterface";

export default interface IUserController {
  handleUserRegister(req: Request, res: Response): Promise<Response>;
  handleUserLogin(req: Request, res: Response): Promise<Response>;
  handleUserEdit(req: IReq, res: Response): Promise<Response>;
  handleUserDelete(req: IReq, res: Response): Promise<Response>;
  handleOneUser(req: Request, res: Response): Promise<Response>;
  handleAllUsers(req: Request, res: Response): Promise<Response>;
}
