import IReq from "./requestInterface";

import { Response } from "express";

export default interface IDeletePostController {
  handle(req: IReq, res: Response): Promise<Response>;
}
