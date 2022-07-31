import IReq from "./requestInterface";

import { Response } from "express";

export default interface IDeletePostLikeController {
  handle(req: IReq, res: Response): Promise<Response>;
}
