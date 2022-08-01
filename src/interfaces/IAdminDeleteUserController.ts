import { Request, Response } from "express";

export default interface IAdminDeleteUserController {
  handle(req: Request, res: Response): Promise<Response>;
}
