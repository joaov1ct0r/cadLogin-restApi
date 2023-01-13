import "dotenv/config";
import jwt from "jsonwebtoken";
import IJwt from "../interfaces/IJson";
import IReq from "../interfaces/IRequest";
import { Response, NextFunction } from "express";
import BadRequestError from "../errors/BadRequestError";
import InternalError from "../errors/InternalError";

export default class Authorization {
  execute(req: IReq, res: Response, next: NextFunction): Response | undefined {
    const token: string = req.cookies.authorization.split(" ")[1];

    if (token.length === 0) {
      const error = new BadRequestError("Token não encontrado!");

      return res
        .status(error.statusCode)
        .json({ error: error.message, status: error.statusCode });
    }

    try {
      const verifiedToken: IJwt = jwt.verify(
        token,
        process.env.JWT_TOKEN_SECRET as string
      ) as IJwt;

      if (!verifiedToken) {
        const error = new ForbiddenError("Falha na autenticação!");
        return res
          .status(error.statusCode)
          .json({ error: error.message, status: error.statusCode });
      }

      req.userId = verifiedToken.id;

      req.admin = verifiedToken.admin;

      next();
    } catch (err: unknown) {
      const error = new InternalError("Erro Interno");
      return res
        .status(error.statusCode)
        .json({ error: err, status: error.statusCode });
    }
  }
}
