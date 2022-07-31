import { Response } from "express";

import IReq from "./IRequest";

export default interface IEditUserController {
  handle(req: IReq, res: Response): Promise<Response>;
}
