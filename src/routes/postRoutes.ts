import express from "express";

import auth from "../middlewares/auth";

import {
  handleAllPosts,
  handleDeletePost,
  handleEditPost,
  handleNewPost,
  handleOnePost,
} from "../controllers/postController";

const userRouter: express.Router = express.Router();

userRouter.post("/register", auth, handleNewPost);

userRouter.put("/edit", auth, handleEditPost);

userRouter.delete("/delete", auth, handleDeletePost);

userRouter.get("/post", auth, handleOnePost);

userRouter.get("/posts", auth, handleAllPosts);

export default userRouter;
