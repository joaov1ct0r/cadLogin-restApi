import { Request, Response } from "express";

export default interface IAdminDeletePostController {
  handle(req: Request, res: Response): Promise<Response>;
}
