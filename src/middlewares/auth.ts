import jwt from "jsonwebtoken";

import IJwt from "../interfaces/jsonInterface";

import IReq from "../interfaces/requestInterface";

import { Response, NextFunction } from "express";

import BadRequestError from "../errors/BadRequestError";

import UnathorizedError from "../errors/UnathorizedError";

export default function (
  req: IReq,
  res: Response,
  next: NextFunction
): Response | undefined {
  const token: string = req.cookies.authorization.split(" ")[1];

  try {
    if (token.length === 0) {
      throw new BadRequestError("Token não encontrado!");
    }

    const verifiedToken: IJwt = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET as string
    ) as IJwt;

    if (!verifiedToken) {
      throw new UnathorizedError("Não autorizado!");
    }
    req.userId = verifiedToken.id;

    req.admin = verifiedToken.admin;

    next();
  } catch (err: any) {
    return res.status(err.statusCode).json(err.message);
  }
}
