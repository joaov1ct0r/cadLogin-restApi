import { Response } from "express";

import IReq from "./requestInterface";

export default interface IEditUserController {
  handle(req: IReq, res: Response): Promise<Response>;
}
