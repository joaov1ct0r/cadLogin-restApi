import IReq from "./IRequest";
import { Response } from "express";

export default interface ICreateNewPostController {
  handle(req: IReq, res: Response): Promise<Response>;
}
