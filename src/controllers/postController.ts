import User from "../database/models/userModel";

import Post from "../database/models/postModel";

import Likes from "../database/models/likesModel";

import { Request, Response } from "express";

import IReq from "../types/requestInterface";

import {
  validateHandleDeletePost,
  validateHandleEditPost,
  validateHandleNewPost,
  validateHandleOnePost,
  validateHandleAddPostLike,
  validateHandleAddPostComment,
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
      where: { id: postId },
    });

    if (isPostRegistered === null) {
      return res.status(404).json({ error: "Post não encontrado!" });
    }

    const isUserAuthor: boolean = isPostRegistered.userId === id;

    if (isUserAuthor === false) {
      return res.status(401).json({ error: "Não autorizado!" });
    }

    const editedPost: [affectedCount: number] = await Post.update(
      {
        content,
      },
      {
        where: { id: postId },
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
      },
    });

    if (isPostRegistered === null) {
      return res.status(404).json({ error: "Post não encontrado!" });
    }

    const isUserAuthor: boolean = isPostRegistered.userId === id;

    if (isUserAuthor === false) {
      return res.status(401).json({ error: "Não autorizado!" });
    }

    const deletedPost: number = await Post.destroy({
      where: { id: postId },
    });

    if (deletedPost === 0) {
      return res.status(500).json({ error: "Falha ao deletar Post!" });
    }

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
    const posts: IPost[] = await Post.findAll({});

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

    const [instance, created] = await Post.upsert({
      primaryKey: postId,
      likes: [...isPostRegistered.likes, user!.email],
    });

    // const updatedLikes: [affectedCount: number] = await Post.update(
    //   {
    //     likes: [...isPostRegistered.likes, user!.email],
    //   },
    //   { where: { id: postId } }
    // );

    // if (updatedLikes[0] === 0) {
    //   return res.status(500).json({ error: "Falha ao adicionar likes!" });
    // }

    return res.status(201).json({ instance });
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

    const updatedComment: [affectedCount: number] = await Post.update(
      {
        comments: { author: user!.email, comment },
      },
      { where: { id: postId } }
    );

    if (updatedComment[0] === 0) {
      return res.status(500).json({ error: "Falha ao adicionar comentario!" });
    }

    return res.status(201).json({ message: "Comentario adicionado!" });
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
};
