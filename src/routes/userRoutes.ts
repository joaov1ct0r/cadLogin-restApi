import express from "express";

import auth from "../middlewares/auth";

import {
  handleAllUsers,
  handleOneUser,
  handleUserDelete,
  handleUserEdit,
  handleUserLogin,
  handleUserRegister,
} from "../controllers/userController";

const userRouter: express.Router = express.Router();

userRouter.post("/register", auth, handleUserRegister);

userRouter.post("/login", auth, handleUserLogin);

userRouter.put("/edit", auth, handleUserEdit);

userRouter.delete("/delete", auth, handleUserDelete);

export default userRouter;
