import IReq from "./IRequest";

import { Response } from "express";

export default interface IDeleteUserController {
  handle(req: IReq, res: Response): Promise<Response>;
}
