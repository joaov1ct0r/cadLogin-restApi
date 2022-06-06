import User from "../database/models/userModel";

import Post from "../database/models/postModel";

import { Request, Response } from "express";

import IReq from "../types/requestInterface";

import {
  validateHandleDeletePost,
  validateHandleEditPost,
  validateHandleNewPost,
  validateHandleOnePost,
} from "../validators/validatePostData";

import IUser from "../types/userInterface";

import IPost from "../types/postInterface";

import { Model } from "sequelize";

const handleNewPost = async (
  req: IReq,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleNewPost(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const id: string | undefined = req.userId;

  const content: string = req.body.content;

  try {
    const user: IUser | null = await User.findOne({
      where: { id },
    });

    if (user === null) {
      return res.status(404).json({ error: "Usuario não encontrado!" });
    }

    const newPost: Model = await Post.create({
      author: user.email,
      content,
      userId: user.id,
    });

    return res.status(201).json({ newPost });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

const handleEditPost = async (req: IReq, res: Response) => {
  const { error } = validateHandleEditPost(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const postId: string = req.body.postId;

  const content: string = req.body.content;

  const id: string | undefined = req.userId;

  try {
    const isPostRegistered: Model<IPost> | null = await Post.findOne({
      where: { id: postId },
    });

    if (isPostRegistered === null) {
      return res.status(404).json({ error: "Post não encontrado!" });
    }

    const isUserAuthor: boolean = isPostRegistered.userId ===  id ? true
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

export { handleNewPost };
