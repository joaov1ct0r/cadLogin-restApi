import { Request, Response } from "express";

export default interface ICreateUserController {
  handle(req: Request, res: Response): Promise<Response>;
}
