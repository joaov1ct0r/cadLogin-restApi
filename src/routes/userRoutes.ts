import express from "express";

import auth from "../middlewares/auth";

import IUserController from "../interfaces/userControllerInterface";

import UserController from "../controllers/userController";

import CreateUserController from "../controllers/CreateUserController";

import ICreateUserController from "../interfaces/ICreateUserController";

import AuthenticateUserController from "../controllers/AuthenticateUserController";

import IAuthenticateUserController from "../interfaces/IAuthenticateUserController";

import EditUserController from "../controllers/EditUserController";

import IEditUserController from "../interfaces/IEditUserController";

import DeleteUserController from "../controllers/DeleteUserController";

import IDeleteUserController from "../interfaces/IDeleteUserController";

const userRouter: express.Router = express.Router();

const userController: IUserController = new UserController();

const createUserController: ICreateUserController = new CreateUserController();

const authenticateUserController: IAuthenticateUserController =
  new AuthenticateUserController();

const editUserController: IEditUserController = new EditUserController();

const deleteUserController: IDeleteUserController = new DeleteUserController();

userRouter.post("/register", createUserController.handle);

userRouter.post("/login", authenticateUserController.handle);

userRouter.put("/edit", auth, editUserController.handle);

userRouter.delete("/delete", auth, deleteUserController.handle);

userRouter.get("/user", auth, userController.handleOneUser);

userRouter.get("/users", auth, userController.handleAllUsers);

export default userRouter;
