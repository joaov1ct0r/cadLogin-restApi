import express from "express";
import authController from "../middlewares/auth.js";

const adminRouter = express.Router();

adminRouter.get("/", authController, validateAdmin);

export default adminRouter;
