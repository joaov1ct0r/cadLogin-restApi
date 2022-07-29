import jwt from "jsonwebtoken";

import IJwt from "../interfaces/jsonInterface";

import IReq from "../interfaces/requestInterface";

import { Response, NextFunction } from "express";

export default function (
  req: IReq,
  res: Response,
  next: NextFunction
): Response | undefined {
  const token: string = req.cookies.authorization.split(" ")[1];

  if (token.length === 0) {
    return res.status(400).json({ error: "Token não encontrado!" });
  }

  try {
    const verifiedToken: IJwt = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET as string
    ) as IJwt;

    if (!verifiedToken) {
      return res.status(401).json({ error: "Falha na autenticação!" });
    }
    req.userId = verifiedToken.id;

    req.admin = verifiedToken.admin;

    next();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
}
