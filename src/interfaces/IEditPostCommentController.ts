import IReq from "./IRequest";
import { Response } from "express";

export default interface IEditPostCommentController {
  handle(req: IReq, res: Response): Promise<Response>;
}
