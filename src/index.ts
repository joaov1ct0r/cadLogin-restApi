import "dotenv/config";

import userRouter from "./routes/userRoutes";

import postRouter from "./routes/postRoutes";

import adminRouter from "./routes/adminRouter.js";

import express from "express";

import cookieParser from "cookie-parser";

const app: express.Express = express();

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use("/posts", postRouter);

app.use("/admin", adminRouter);

app.listen(process.env.NODE_ENV_SERVER_PORT, (): void => {
  console.log("Server running");
});
