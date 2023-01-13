import { Handler, NextFunction, Request, Response } from "express";

export default class Resolver {
  handle(handlerFn: Handler) {
    return (req: Request, res: Response, next: NextFunction) => {
      return Promise.resolve(handlerFn(req, res, next)).catch((err) =>
        next(err)
      );
    };
  }
}
