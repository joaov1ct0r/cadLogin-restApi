import express from "express";
import Resolver from "../utils/Resolver";
import Authorization from "../middlewares/auth";
import CreateNewPostController from "../controllers/CreateNewPostController";
import EditPostController from "../controllers/EditPostController";
import DeletePostController from "../controllers/DeletePostController";
import ListAllPostsController from "../controllers/ListAllPostsController";
import ListPostController from "../controllers/ListPostController";
import AddPostLikeController from "../controllers/AddPostLikeController";
import DeletePostLikeController from "../controllers/DeletePostLikeController";
import AddPostCommentController from "../controllers/AddPostCommentController";
import EditPostCommentController from "../controllers/EditPostCommentController";
import DeletePostCommentController from "../controllers/DeletePostCommentController";

const postRouter: express.Router = express.Router();

const createNewPostController: CreateNewPostController =
  new CreateNewPostController();

const editPostController: EditPostController = new EditPostController();

const deletePostController: DeletePostController = new DeletePostController();

const listAllPostsController: ListAllPostsController =
  new ListAllPostsController();

const listPostController: ListPostController = new ListPostController();

const addPostLikeController: AddPostLikeController =
  new AddPostLikeController();

const deletePostLikeController: DeletePostLikeController =
  new DeletePostLikeController();

const addPostCommentController: AddPostCommentController =
  new AddPostCommentController();

const editPostCommentController: EditPostCommentController =
  new EditPostCommentController();

const deletePostCommentController: DeletePostCommentController =
  new DeletePostCommentController();

const authorization: Authorization = new Authorization();

const resolver: Resolver = new Resolver();

postRouter.post(
  "/register",
  authorization.execute,
  resolver.handle(createNewPostController.handle)
);

postRouter.post(
  "/like",
  authorization.execute,
  resolver.handle(addPostLikeController.handle)
);

postRouter.delete(
  "/like/delete",
  authorization.execute,
  resolver.handle(deletePostLikeController.handle)
);

postRouter.post(
  "/comment",
  authorization.execute,
  resolver.handle(addPostCommentController.handle)
);

postRouter.put(
  "/comment/edit",
  auth,
  resolver(editPostCommentController.handle)
);

postRouter.delete(
  "/comment/delete",
  auth,
  resolver(deletePostCommentController.handle)
);

postRouter.put(
  "/edit",
  authorization.execute,
  resolver.handle(editPostController.handle)
);

postRouter.delete(
  "/delete",
  authorization.execute,
  resolver.handle(deletePostController.handle)
);

postRouter.get(
  "/post",
  authorization.execute,
  resolver.handle(listPostController.handle)
);

postRouter.get(
  "/posts",
  authorization.execute,
  resolver.handle(listAllPostsController.handle)
);

export default postRouter;
