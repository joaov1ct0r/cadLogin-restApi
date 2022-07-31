import { Request, Response } from "express";

export default interface IListAllPostsController {
  handle(req: Request, res: Response): Promise<Response>;
}
