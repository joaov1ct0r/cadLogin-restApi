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

import ListPostController from "../controllers/ListPostController";

import IListPostController from "../interfaces/IListPostController";

import AddPostLikeController from "../controllers/AddPostLikeController";

import IAddPostLikeController from "../interfaces/IAddPostLikeController";

const postRouter: express.Router = express.Router();

const postController: IPostController = new PostController();

const createNewPostController: ICreateNewPostController =
  new CreateNewPostController();

const editPostController: IEditPostController = new EditPostController();

const deletePostController: IDeletePostController = new DeletePostController();

const listAllPostsController: IListAllPostsController =
  new ListAllPostsController();

const listPostController: IListPostController = new ListPostController();

const addPostLikeController: IAddPostLikeController =
  new AddPostLikeController();

postRouter.post("/register", auth, createNewPostController.handle);

postRouter.post("/like", auth, addPostLikeController.handle);

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

postRouter.get("/post", auth, listPostController.handle);

postRouter.get("/posts", auth, listAllPostsController.handle);

export default postRouter;
