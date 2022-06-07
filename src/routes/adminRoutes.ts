import express from "express";

import auth from "../middlewares/auth";

const adminRouter = express.Router();

adminRouter.get("/", authController, validateAdmin);

export default adminRouter;
