import { Request, Response } from "express";

export default interface IAuthenticateUserController {
  handle(req: Request, res: Response): Promise<Response>;
}
