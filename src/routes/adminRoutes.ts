import express from "express";
import resolver from "../utils/Resolver";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
import AdminEditUserController from "../controllers/AdminEditUserController";
import AdminDeleteUserController from "../controllers/AdminDeleteUserController";

import AdminDeletePostController from "../controllers/AdminDeletePostController";

import IAdminDeletePostController from "../interfaces/IAdminDeletePostController";

const adminRouter: express.Router = express.Router();

const adminEditUserController: AdminEditUserController =
  new AdminEditUserController();

const adminDeleteUserController: AdminDeleteUserController =
  new AdminDeleteUserController();

const adminDeletePostController: IAdminDeletePostController =
  new AdminDeletePostController();

adminRouter.put(
  "/user/edit",
  auth,
  admin,
  resolver(adminEditUserController.handle)
);

adminRouter.delete(
  "/user/delete",
  auth,
  admin,
  resolver(adminDeleteUserController.handle)
);

adminRouter.delete(
  "/post/delete",
  auth,
  admin,
  resolver(adminDeletePostController.handle)
);

export default adminRouter;
