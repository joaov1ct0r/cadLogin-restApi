import { Request, Response } from "express";

import IReq from "./requestInterface";

export default interface IPostController {
  handleNewPost(req: IReq, res: Response): Promise<Response>;
  handleEditPost(req: IReq, res: Response): Promise<Response>;
  handleDeletePost(req: IReq, res: Response): Promise<Response>;
  handleAllPosts(req: Request, res: Response): Promise<Response>;
  handleOnePost(req: Request, res: Response): Promise<Response>;
  handleAddPostLike(req: IReq, res: Response): Promise<Response>;
  handleDeletePostLike(req: IReq, res: Response): Promise<Response>;
  handleAddPostComment(req: IReq, res: Response): Promise<Response>;
  handleEditPostComment(req: IReq, res: Response): Promise<Response>;
  handleDeletePostComment(req: IReq, res: Response): Promise<Response>;
}
