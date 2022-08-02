import express from "express";

import cookieParser from "cookie-parser";

import cors from "cors";

import userRouter from "./routes/userRoutes";

import postRouter from "./routes/postRoutes";

import adminRouter from "./routes/adminRoutes";

import swaggerUi from "swagger-ui-express";

import swaggerDocs from "./swagger.json";

export default class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.userRoutes();
    this.postRoutes();
    this.adminRoutes();
    this.docsRoutes();
  }

  private middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(cookieParser());
    this.server.use(express.urlencoded({ extended: true }));
  }

  private userRoutes() {
    this.server.use("/api/users", userRouter);
  }

  private postRoutes() {
    this.server.use("/api/posts", postRouter);
  }

  private adminRoutes() {
    this.server.use("/api/admin", adminRouter);
  }

  private docsRoutes() {
    this.server.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
}
