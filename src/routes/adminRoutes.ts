import express from "express";
import Resolver from "../utils/Resolver";
import Authorization from "../middlewares/auth";
import IsAdmin from "../middlewares/admin";
import AdminEditUserController from "../controllers/AdminEditUserController";
import AdminDeleteUserController from "../controllers/AdminDeleteUserController";
import AdminDeletePostController from "../controllers/AdminDeletePostController";

const adminRouter: express.Router = express.Router();

const adminEditUserController: AdminEditUserController =
  new AdminEditUserController();

const adminDeleteUserController: AdminDeleteUserController =
  new AdminDeleteUserController();

const adminDeletePostController: AdminDeletePostController =
  new AdminDeletePostController();

const resolver: Resolver = new Resolver();

const authorization: Authorization = new Authorization();

const isAdmin: IsAdmin = new IsAdmin();

adminRouter.put(
  "/user/edit",
  authorization.execute,
  isAdmin.execute,
  resolver.handle(adminEditUserController.handle)
);

adminRouter.delete(
  "/user/delete",
  authorization.execute,
  isAdmin.execute,
  resolver.handle(adminDeleteUserController.handle)
);

adminRouter.delete(
  "/post/delete",
  authorization.execute,
  isAdmin.execute,
  resolver.handle(adminDeletePostController.handle)
);

export default adminRouter;
