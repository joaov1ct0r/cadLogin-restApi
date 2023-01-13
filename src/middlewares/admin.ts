import InternalError from "../errors/InternalError";
import UnauthorizedError from "../errors/UnauthorizedError";
import IReq from "../interfaces/IRequest";
import { Response, NextFunction } from "express";

export default class IsAdmin {
  execute(req: IReq, res: Response, next: NextFunction): Response | undefined {
    try {
      const isUserAdmin: boolean | undefined = req.admin;

      if (isUserAdmin === false) {
        const error = new UnauthorizedError("Não autorizado!");

        return res
          .status(error.statusCode)
          .json({ error, status: error.statusCode });
      }

      next();
    } catch (err: any) {
      const error = new InternalError("Erro interno!");

      return res
        .status(error.statusCode)
        .json({ error: err, status: error.statusCode });
    }
  }
}
