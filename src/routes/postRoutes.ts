import express from "express";

import auth from "../middlewares/auth";

import PostController from "../controllers/postController";

import IPostController from "../interfaces/postControllerInterface";

import CreateNewPostController from "../controllers/CreateNewPostController";

import ICreateNewPostController from "../interfaces/ICreateNewPostController";

import EditPostController from "../controllers/EditPostController";

import IEditPostController from "../interfaces/IEditPostController";

import DeletePostController from "../controllers/DeletePostController";

import IDeletePostController from "../interfaces/IDeletePostController";

import ListAllPostsController from "../controllers/ListAllPostsController";

import IListAllPostsController from "../interfaces/IListAllPostsController";

const postRouter: express.Router = express.Router();

const postController: IPostController = new PostController();

const createNewPostController: ICreateNewPostController =
  new CreateNewPostController();

const editPostController: IEditPostController = new EditPostController();

const deletePostController: IDeletePostController = new DeletePostController();

const listAllPostsController: IListAllPostsController =
  new ListAllPostsController();

postRouter.post("/register", auth, createNewPostController.handle);

postRouter.post("/like", auth, postController.handleAddPostLike);

postRouter.delete("/like/delete", auth, postController.handleDeletePostLike);

postRouter.post("/comment", auth, postController.handleAddPostComment);

postRouter.put("/comment/edit", auth, postController.handleEditPostComment);

postRouter.delete(
  "/comment/delete",
  auth,
  postController.handleDeletePostComment
);

postRouter.put("/edit", auth, editPostController.handle);

postRouter.delete("/delete", auth, deletePostController.handle);

postRouter.get("/post", auth, postController.handleOnePost);

postRouter.get("/posts", auth, listAllPostsController.handle);

export default postRouter;
