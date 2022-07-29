import express from "express";

import auth from "../middlewares/auth";

import PostController from "../controllers/postController";

import IPostController from "../interfaces/postControllerInterface";

const postRouter: express.Router = express.Router();

const postController: IPostController = new PostController();

postRouter.post("/register", auth, postController.handleNewPost);

postRouter.post("/like", auth, postController.handleAddPostLike);

postRouter.delete("/like/delete", auth, postController.handleDeletePostLike);

postRouter.post("/comment", auth, postController.handleAddPostComment);

postRouter.put("/comment/edit", auth, postController.handleEditPostComment);

postRouter.delete(
  "/comment/delete",
  auth,
  postController.handleDeletePostComment
);

postRouter.put("/edit", auth, postController.handleEditPost);

postRouter.delete("/delete", auth, postController.handleDeletePost);

postRouter.get("/post", auth, postController.handleOnePost);

postRouter.get("/posts", auth, postController.handleAllPosts);

export default postRouter;
