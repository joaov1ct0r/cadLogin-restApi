import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import adminRouter from "./routes/adminRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import BadRequestError from "./errors/BadRequestError";
import InternalError from "./errors/InternalError";
import UnauthorizedError from "./errors/UnauthorizedError";

export default class App {
  public readonly server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(cookieParser());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(
      (
        error: BadRequestError | InternalError | UnauthorizedError,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        if (error && error.statusCode) {
          return res.status(error.statusCode).json({
            message: error.message,
            status: error.statusCode,
          });
        }
      }
    );
  }

  private routes() {
    this.server.use("/api/users", userRouter);
    this.server.use("/api/posts", postRouter);
    this.server.use("/api/admin", adminRouter);
    this.server.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
}
