import auth from "../middlewares/auth";

import express from "express";

import {
  handleAllUsers,
  handleOneUser,
  handleUserDelete,
  handleUserEdit,
  handleUserLogin,
  handleUserRegister,
} from "../controllers/userController";

const userRouter: express.Router = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

export default userRouter;
