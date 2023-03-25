import express from "express";
import Resolver from "../utils/Resolver";
import Authorization from "../middlewares/auth";
import CreateUserController from "../controllers/CreateUserController";
import AuthenticateUserController from "../controllers/AuthenticateUserController";
import EditUserController from "../controllers/EditUserController";
import DeleteUserController from "../controllers/DeleteUserController";
import ListAllUsersController from "../controllers/ListAllUsersController";
import ListUserController from "../controllers/ListUserController";

const userRouter: express.Router = express.Router();

const authorization: Authorization = new Authorization();

const resolver: Resolver = new Resolver();

const createUserController: CreateUserController = new CreateUserController();

const authenticateUserController: AuthenticateUserController =
  new AuthenticateUserController();

const editUserController: EditUserController = new EditUserController();

const deleteUserController: DeleteUserController = new DeleteUserController();

const listAllUsersController: ListAllUsersController =
  new ListAllUsersController();

const listUserController: ListUserController = new ListUserController();

userRouter.post("/register", resolver.handle(createUserController.handle));

userRouter.post("/login", resolver.handle(authenticateUserController.handle));

userRouter.put(
  "/edit",
  authorization.execute,
  resolver.handle(editUserController.handle)
);

userRouter.delete(
  "/delete",
  authorization.execute,
  resolver.handle(deleteUserController.handle)
);

userRouter.get(
  "/user/:email",
  authorization.execute,
  resolver.handle(listUserController.handle)
);

userRouter.get(
  "/users",
  authorization.execute,
  resolver.handle(listAllUsersController.handle)
);

export default userRouter;
