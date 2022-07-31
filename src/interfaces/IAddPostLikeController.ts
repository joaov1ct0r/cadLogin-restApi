import { Response } from "express";

import IReq from "./IRequest";

export default interface IAddPostLikeController {
  handle(req: IReq, res: Response): Promise<Response>;
}
