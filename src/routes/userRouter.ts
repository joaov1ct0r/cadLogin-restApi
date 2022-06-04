import { login, register } from "../controllers/userController.js";

import express from "express";

const userRouter: express.Router = express.Router();

userRouter.post("/login", login);

userRouter.post("/register", register);

export default userRouter;
