import express from "express";

import auth from "../middlewares/auth";

import IUserController from "../types/userControllerInterface";

import UserController from "../controllers/userController";

const userRouter: express.Router = express.Router();

const userController: IUserController = new UserController();

userRouter.post("/register", userController.handleUserRegister);

userRouter.post("/login", userController.handleUserLogin);

userRouter.put("/edit", auth, userController.handleUserEdit);

userRouter.delete("/delete", auth, userController.handleUserDelete);

userRouter.get("/user", auth, userController.handleOneUser);

userRouter.get("/users", auth, userController.handleAllUsers);

export default userRouter;
