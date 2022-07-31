import IReq from "./requestInterface";

import { Response } from "express";

export default interface IEditPostCommentController {
  handle(req: IReq, res: Response): Promise<Response>;
}
