import User from "../database/models/userModel";

import Post from "../database/models/postModel";

import Likes from "../database/models/likesModel";

import ILikes from "../types/likesInterface";

import Comments from "../database/models/commentsModel";

import IComments from "../types/commentsInterface";

import { Request, Response } from "express";

import IReq from "../types/requestInterface";

import {
  validateHandleDeletePost,
  validateHandleEditPost,
  validateHandleNewPost,
  validateHandleOnePost,
  validateHandleAddPostLike,
  validateHandleAddPostComment,
  validateHandleDeletePostLike,
  validateHandleEditPostComment,
  validateHandleDeletePostComment,
} from "../validators/validatePostData";

import IUser from "../types/userInterface";

import IPost from "../types/postInterface";

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

    const newPost: IPost = await Post.create({
      author: user.email,
      content,
      userId: user.id,
    });

    return res.status(201).json({ newPost });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

const handleEditPost = async (
  req: IReq,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleEditPost(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const postId: string = req.body.postId;

  const content: string = req.body.content;

  const id: string | undefined = req.userId;

  try {
    const isPostRegistered: IPost | null = await Post.findOne({
      where: { id: postId, userId: id },
    });

    if (isPostRegistered === null) {
      return res.status(404).json({ error: "Post não encontrado!" });
    }

    const editedPost: [affectedCount: number] = await Post.update(
      {
        content,
      },
      {
        where: { id: postId, userId: id },
      }
    );

    if (editedPost[0] === 0) {
      return res.status(500).json({ error: "Falha ao atualizar Post!" });
    }

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

const handleDeletePost = async (
  req: IReq,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleDeletePost(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const id: string | undefined = req.userId;

  const postId: string = req.body.postId;

  try {
    const isPostRegistered: IPost | null = await Post.findOne({
      where: {
        id: postId,
        userId: id,
      },
    });

    if (isPostRegistered === null) {
      return res.status(404).json({ error: "Post não encontrado!" });
    }

    // eslint-disable-next-line no-unused-vars
    const deletedPost: number = await Post.destroy({
      where: { id: postId, userId: id },
    });

    if (deletedPost === 0) {
      return res.status(500).json({ error: "Falha ao deletar Post!" });
    }

    // eslint-disable-next-line no-unused-vars
    const deletedLikes: number = await Likes.destroy({
      where: { postId },
    });

    // eslint-disable-next-line no-unused-vars
    const deletedComments: number = await Comments.destroy({
      where: { postId },
    });

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

const handleAllPosts = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const posts: IPost[] = await Post.findAll({
      include: [
        {
          model: Likes,
        },
        {
          model: Comments,
        },
      ],
    });

    return res.status(200).json({ posts });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

const handleOnePost = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleOnePost(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const postId: string = req.body.postId;

  try {
    const post: IPost | null = await Post.findOne({
      include: [
        {
          model: Likes,
          where: { postId },
        },
        {
          model: Comments,
          where: { postId },
        },
      ],
      where: { id: postId },
    });

    if (post === null) {
      return res.status(404).json({ error: "Post não encontrado!" });
    }

    return res.status(200).json({ post });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

const handleAddPostLike = async (
  req: IReq,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleAddPostLike(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const id: string | undefined = req.userId;

  const postId: string = req.body.postId;

  try {
    const isPostRegistered: IPost | null = await Post.findOne({
      where: { id: postId },
    });

    if (isPostRegistered === null) {
      return res.status(404).json({ error: "Post não encontrado!" });
    }

    const user: IUser | null = await User.findOne({
      where: { id },
    });

    const isLikeRegistered: ILikes | null = await Likes.findOne({
      where: { postId, userId: id },
    });

    if (isLikeRegistered !== null) {
      return res.status(401).json({ error: "Like já registrado!" });
    }

    const addedLike: ILikes = await Likes.create({
      postId,
      likedBy: user!.email,
      userId: user!.id,
    });

    return res
      .status(201)
      .json({ message: "Like adicionado a post!", addedLike });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

const handleDeletePostLike = async (req: IReq, res: Response) => {
  const { error } = validateHandleDeletePostLike(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const userId: string | undefined = req.userId;

  const postId: string = req.body.postId;

  try {
    const isPostRegistered: IPost | null = await Post.findOne({
      where: { postId },
    });

    if (isPostRegistered === null) {
      return res.status(404).json({ error: "Post não encontrado!" });
    }

    const isLikeRegistered: ILikes | null = await Likes.findOne({
      where: { postId, userId },
    });

    if (isLikeRegistered === null) {
      return res.status(404).json({ error: "Like não encontrado!" });
    }

    const deletedLike: number = await Likes.destroy({
      where: { postId, userId },
    });

    if (deletedLike === 0) {
      return res.status(500).json({ error: "Falha ao deletar Like!" });
    }

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

const handleAddPostComment = async (
  req: IReq,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleAddPostComment(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const postId: string = req.body.postId;

  const comment: string = req.body.comment;

  const id: string | undefined = req.userId;

  try {
    const isPostRegistered: IPost | null = await Post.findOne({
      where: { id: postId },
    });

    if (isPostRegistered === null) {
      return res.status(404).json({ error: "Post não encontrado!" });
    }

    const user: IUser | null = await User.findOne({
      where: { id },
    });

    const createdComment: IComments = await Comments.create({
      author: user!.email,
      userId: user!.id,
      comment,
      postId,
    });

    return res.status(201).json({ createdComment });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

const handleEditPostComment = async (req: IReq, res: Response) => {
  const { error } = validateHandleEditPostComment(req.body);

  if (error) {
    return res.status(500).json({ error });
  }

  const postId: string = req.body.postId;

  const content: string = req.body.content;

  const userId: string | undefined = req.userId;

  try {
    const isPostRegistered: IPost | null = await Post.findOne({
      where: { id: postId },
    });

    if (isPostRegistered === null) {
      return res.status(404).json({ error: "Post não encontrado!" });
    }

    const isCommentRegistered: IComments | null = await Comments.findOne({
      where: { postId, userId },
    });

    if (isCommentRegistered === null) {
      return res.status(404).json({ error: "Comentario não encontrado!" });
    }

    const updatedComment: [affectedCount: number] = await Comments.update(
      {
        content,
      },
      {
        where: { postId, userId },
      }
    );

    if (updatedComment[0] === 0) {
      return res.status(500).json({ error: "Falha ao atualizar comentario!" });
    }

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

const handleDeletePostComment = async (req: IReq, res: Response) => {
  const { error } = validateHandleDeletePostComment(req.body);

  if (error) {
    return res.status(500).json({ error });
  }

  const postId: string = req.body.postId;

  const userId: string | undefined = req.userId;

  try {
    const isPostRegistered: IPost | null = await Post.findOne({
      where: { id: postId },
    });

    if (isPostRegistered === null) {
      return res.status(404).json({ error: "Post não encontrado!" });
    }

    const isCommentRegistered: IComments | null = await Comments.findOne({
      where: { postId, userId },
    });

    if (isCommentRegistered === null) {
      return res.status(404).json({ error: "Comentario não encontrado!" });
    }

    const deletedComment: number = await Comments.destroy({
      where: { postId, userId },
    });

    if (deletedComment === 0) {
      return res.status(500).json({ error: "Falha ao deletar comentario!" });
    }

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

export {
  handleNewPost,
  handleEditPost,
  handleDeletePost,
  handleAllPosts,
  handleOnePost,
  handleAddPostLike,
  handleAddPostComment,
  handleDeletePostLike,
  handleEditPostComment,
  handleDeletePostComment,
};
