import IReq from "../interfaces/requestInterface";

import { Response, NextFunction } from "express";

import UnathorizedError from "../errors/UnathorizedError";

export default async function (
  req: IReq,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> {
  try {
    const isUserAdmin: boolean | undefined = req.admin;

    if (isUserAdmin === false) {
      throw new UnathorizedError("Não autorizado!");
    }

    next();
  } catch (err: any) {
    return res.status(err.statusCode).json(err.message);
  }
}
