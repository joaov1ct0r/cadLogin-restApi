import express from "express";

import auth from "../middlewares/auth";

import admin from "../middlewares/admin";

const adminRouter: express.Router = express.Router();

adminRouter.get("/", authController, validateAdmin);

export default adminRouter;
