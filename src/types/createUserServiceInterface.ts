import { Request, Response } from "express";

export default interface ICreateUserService {
  execute(req: Request, res: Response): Promise<Response>;
}
