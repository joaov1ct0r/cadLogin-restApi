import IReq from "../types/requestInterface";

import { Response, NextFunction } from "express";

export default function (req: IReq, res: Response, next: NextFunction) {
  try {
    const isUserAdmin: boolean = req.admin === true;

    if (isUserAdmin === false) {
      return res.status(401).json({ error: "Não autorizado!" });
    }

    next();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
}
