import jwt from "jsonwebtoken";

import IJwt from "../interfaces/IJson";

import IReq from "../interfaces/IRequest";

import { Response, NextFunction } from "express";

export default function (
  req: IReq,
  res: Response,
  next: NextFunction
): Response | undefined {
  const token: string = req.cookies.authorization.split(" ")[1];

  try {
    const verifiedToken: IJwt = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET as string
    ) as IJwt;

    req.userId = verifiedToken.id;

    req.admin = verifiedToken.admin;

    next();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
}
