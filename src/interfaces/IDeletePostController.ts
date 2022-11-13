import IReq from "./IRequest";
import { Response } from "express";

export default interface IDeletePostController {
  handle(req: IReq, res: Response): Promise<Response>;
}
