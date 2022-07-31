import IReq from "./IRequest";

import { Response } from "express";

export default interface IDeletePostCommentController {
  handle(req: IReq, res: Response): Promise<Response>;
}
