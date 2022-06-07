import express from "express";

import auth from "../middlewares/auth";

import admin from "../middlewares/admin";

import {
  handleAdminDeletePost,
  handleAdminDeleteUser,
  handleAdminEditUser,
} from "../controllers/adminController";

const adminRouter: express.Router = express.Router();

adminRouter.put("/user/edit", auth, admin, handleAdminEditUser);

export default adminRouter;
