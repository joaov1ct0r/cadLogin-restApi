import express from "express";

import auth from "../middlewares/auth";

import admin from "../middlewares/admin";

import AdminEditUserController from "../controllers/AdminEditUserController";

import IAdminEditUserController from "../interfaces/IAdminEditUserController";

import {
  handleAdminDeletePost,
  handleAdminDeleteUser,
  handleAdminEditUser,
} from "../controllers/adminController";

const adminRouter: express.Router = express.Router();

const adminEditUserController: IAdminEditUserController =
  new AdminEditUserController();

adminRouter.put("/user/edit", auth, admin, adminEditUserController.handle);

adminRouter.delete("/user/delete", auth, admin, handleAdminDeleteUser);

adminRouter.delete("/post/delete", auth, admin, handleAdminDeletePost);

export default adminRouter;
