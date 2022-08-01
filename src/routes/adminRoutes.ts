import express from "express";

import auth from "../middlewares/auth";

import admin from "../middlewares/admin";

import AdminEditUserController from "../controllers/AdminEditUserController";

import IAdminEditUserController from "../interfaces/IAdminEditUserController";

import AdminDeleteUserController from "../controllers/AdminDeleteUserController";

import IAdminDeleteUserController from "../interfaces/IAdminDeleteUserController";

import {
  handleAdminDeletePost,
  handleAdminDeleteUser,
  handleAdminEditUser,
} from "../controllers/adminController";

const adminRouter: express.Router = express.Router();

const adminEditUserController: IAdminEditUserController =
  new AdminEditUserController();

const adminDeleteUserController: IAdminDeleteUserController =
  new AdminDeleteUserController();

adminRouter.put("/user/edit", auth, admin, adminEditUserController.handle);

adminRouter.delete(
  "/user/delete",
  auth,
  admin,
  adminDeleteUserController.handle
);

adminRouter.delete("/post/delete", auth, admin, handleAdminDeletePost);

export default adminRouter;
