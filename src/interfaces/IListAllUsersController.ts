import { Request, Response } from "express";

export default interface IListAllUsersController {
  handle(req: Request, res: Response): Promise<Response>;
}
