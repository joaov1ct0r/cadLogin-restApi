import IReq from "./IRequest";
import { Response } from "express";

export default interface IDeletePostLikeController {
  handle(req: IReq, res: Response): Promise<Response>;
}
