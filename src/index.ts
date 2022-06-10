import "dotenv/config";

import express from "express";

import cookieParser from "cookie-parser";

import cors from "cors";

import userRouter from "./routes/userRoutes";

import postRouter from "./routes/postRoutes";

import adminRouter from "./routes/adminRoutes";

const app: express.Express = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.use("/api/posts", postRouter);

app.use("/api/admin", adminRouter);

app.listen(process.env.NODE_ENV_SERVER_PORT, (): void => {
  console.log("Server running");
});
