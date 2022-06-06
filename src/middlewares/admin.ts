import IReq from "../types/requestInterface";

import { Response, NextFunction } from "express";

export default async function (
  req: IReq,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> {
  try {
    const isUserAdmin: boolean | undefined = req.admin;

    if (isUserAdmin === false) {
      return res.status(401).json({ error: "Não autorizado!" });
    }

    next();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
}
