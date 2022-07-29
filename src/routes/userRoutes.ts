import express from "express";

import auth from "../middlewares/auth";

import IUserController from "../interfaces/userControllerInterface";

import UserController from "../controllers/userController";

import CreateUserController from "../controllers/CreateUserController";

import ICreateUserController from "../interfaces/ICreateUserController";

import AuthenticateUserController from "../controllers/AuthenticateUserController";

import IAuthenticateUserController from "../interfaces/IAuthenticateUserController";

const userRouter: express.Router = express.Router();

const userController: IUserController = new UserController();

const createUserController: ICreateUserController = new CreateUserController();

const authenticateUserController: IAuthenticateUserController =
  new AuthenticateUserController();

userRouter.post("/register", createUserController.handle);

userRouter.post("/login", authenticateUserController.handle);

userRouter.put("/edit", auth, userController.handleUserEdit);

userRouter.delete("/delete", auth, userController.handleUserDelete);

userRouter.get("/user", auth, userController.handleOneUser);

userRouter.get("/users", auth, userController.handleAllUsers);

export default userRouter;
