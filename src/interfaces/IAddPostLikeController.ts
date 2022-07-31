import { Response } from "express";

import IReq from "./requestInterface";

export default interface IAddPostLikeController {
  handle(req: IReq, res: Response): Promise<Response>;
}
