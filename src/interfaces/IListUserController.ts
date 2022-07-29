import { Request, Response } from "express";

export default interface IListUserController {
  handle(req: Request, res: Response): Promise<Response>;
}
