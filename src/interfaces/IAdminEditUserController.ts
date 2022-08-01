import { Request, Response } from "express";

export default interface IAdminEditUserController {
  handle(req: Request, res: Response): Promise<Response>;
}
