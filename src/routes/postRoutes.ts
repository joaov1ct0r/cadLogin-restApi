import express from "express";

import auth from "../middlewares/auth";

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

import DeletePostLikeController from "../controllers/DeletePostLikeController";

import IDeletePostLikeController from "../interfaces/IDeletePostLikeController";

import AddPostCommentController from "../controllers/AddPostCommentController";

import IAddPostCommentController from "../interfaces/IAddPostCommentController";

import EditPostCommentController from "../controllers/EditPostCommentController";

import IEditPostCommentController from "../interfaces/IEditPostCommentController";

import DeletePostCommentController from "../controllers/DeletePostCommentController";

import IDeletePostCommentController from "../interfaces/IDeletePostCommentController";

const postRouter: express.Router = express.Router();

const createNewPostController: ICreateNewPostController =
  new CreateNewPostController();

const editPostController: IEditPostController = new EditPostController();

const deletePostController: IDeletePostController = new DeletePostController();

const listAllPostsController: IListAllPostsController =
  new ListAllPostsController();

const listPostController: IListPostController = new ListPostController();

const addPostLikeController: IAddPostLikeController =
  new AddPostLikeController();

const deletePostLikeController: IDeletePostLikeController =
  new DeletePostLikeController();

const addPostCommentController: IAddPostCommentController =
  new AddPostCommentController();

const editPostCommentController: IEditPostCommentController =
  new EditPostCommentController();

const deletePostCommentController: IDeletePostCommentController =
  new DeletePostCommentController();

postRouter.post("/register", auth, createNewPostController.handle);

postRouter.post("/like", auth, addPostLikeController.handle);

postRouter.delete("/like/delete", auth, deletePostLikeController.handle);

postRouter.post("/comment", auth, addPostCommentController.handle);

postRouter.put("/comment/edit", auth, editPostCommentController.handle);

postRouter.delete("/comment/delete", auth, deletePostCommentController.handle);

postRouter.put("/edit", auth, editPostController.handle);

postRouter.delete("/delete", auth, deletePostController.handle);

postRouter.get("/post", auth, listPostController.handle);

postRouter.get("/posts", auth, listAllPostsController.handle);

export default postRouter;
