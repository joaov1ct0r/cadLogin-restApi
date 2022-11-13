import IReq from "./IRequest";
import { Response } from "express";

export default interface IEditPostController {
  handle(req: IReq, res: Response): Promise<Response>;
}
