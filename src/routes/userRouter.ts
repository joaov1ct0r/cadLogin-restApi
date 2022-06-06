import {
  handleAllUsers,
  handleOneUser,
  handleUserDelete,
  handleUserEdit,
  handleUserLogin,
  handleUserRegister,
} from "../controllers/userController";

import express from "express";

const userRouter: express.Router = express.Router();

userRouter.post("/login", login);

userRouter.post("/register", register);

export default userRouter;
