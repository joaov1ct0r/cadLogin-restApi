import IReq from "./requestInterface";

import { Response } from "express";

export default interface ICreateNewPostController {
  handle(req: IReq, res: Response): Promise<Response>;
}
