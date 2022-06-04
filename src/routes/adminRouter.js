import validateAdmin from "../controllers/adminController.js";

import authController from "../middlewares/auth.js";

import express from "express";

const adminRouter = express.Router();

adminRouter.get("/", authController, validateAdmin);

export default adminRouter;
