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

userRouter.post("/register", handleUserRegister);

userRouter.post("/login", handleUserLogin);

userRouter.put("/edit", auth, handleUserEdit);

userRouter.delete("/delete", auth, handleUserDelete);

userRouter.get("/user", auth, handleOneUser);

userRouter.get("/users", auth, handleAllUsers);

export default userRouter;
