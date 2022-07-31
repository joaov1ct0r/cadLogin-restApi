import IReq from "./requestInterface";

import { Response } from "express";

export default interface IEditPostController {
  handle(req: IReq, res: Response): Promise<Response>;
}
