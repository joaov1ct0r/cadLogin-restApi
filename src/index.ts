import "dotenv/config";

import express from "express";

import cookieParser from "cookie-parser";

import cors from "cors";

import userRouter from "./routes/userRoutes";

import postRouter from "./routes/postRoutes";

import adminRouter from "./routes/adminRoutes";

import swaggerUi from "swagger-ui-express";

import swaggerDocs from "./swagger.json";

const app: express.Express = express();

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.use("/api/posts", postRouter);

app.use("/api/admin", adminRouter);

app.listen(process.env.SERVER_PORT, (): void => {
  console.log("Server running");
});
