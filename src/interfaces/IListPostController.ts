import { Request, Response } from "express";

export default interface IListPostController {
  handle(req: Request, res: Response): Promise<Response>;
}
