import User from "../database/models/userModel";

import Post from "../database/models/postModel";

import Likes from "../database/models/likesModel";

import ILikes from "../interfaces/ILikes";

import Comments from "../database/models/commentsModel";

import IComments from "../interfaces/commentsInterface";

import { Request, Response } from "express";

import IReq from "../interfaces/requestInterface";

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
} from "../validations/validatePostData";

import IUser from "../interfaces/userInterface";

import IPost from "../interfaces/postInterface";

import { Op } from "sequelize";

export default class PostController {
  async handleAddPostComment(req: IReq, res: Response): Promise<Response> {
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
  }

  async handleEditPostComment(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleEditPostComment(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const postId: string = req.body.postId;

    const commentId: string = req.body.commentId;

    const comment: string = req.body.comment;

    const userId: string | undefined = req.userId;

    try {
      const isPostRegistered: IPost | null = await Post.findOne({
        where: { id: postId },
      });

      if (isPostRegistered === null) {
        return res.status(404).json({ error: "Post não encontrado!" });
      }

      const isCommentRegistered: IComments | null = await Comments.findOne({
        where: {
          [Op.and]: [
            {
              postId,
              userId,
              id: commentId,
            },
          ],
        },
      });

      if (isCommentRegistered === null) {
        return res.status(404).json({ error: "Comentario não encontrado!" });
      }

      const user: IUser | null = await User.findOne({
        where: {
          id: userId,
        },
      });

      const updatedComment: [affectedCount: number] = await Comments.update(
        {
          comment,
          author: user!.email,
          userId,
          postId: isPostRegistered.id,
        },
        {
          where: {
            [Op.and]: [
              {
                postId,
                userId,
                id: commentId,
              },
            ],
          },
        }
      );

      if (updatedComment[0] === 0) {
        return res
          .status(500)
          .json({ error: "Falha ao atualizar comentario!" });
      }

      return res.status(204).send();
    } catch (err: unknown) {
      return res.status(500).json({ err });
    }
  }

  async handleDeletePostComment(req: IReq, res: Response): Promise<Response> {
    const { error } = validateHandleDeletePostComment(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const postId: string = req.body.postId;

    const commentId: string = req.body.commentId;

    const userId: string | undefined = req.userId;

    try {
      const isPostRegistered: IPost | null = await Post.findOne({
        where: { id: postId },
      });

      if (isPostRegistered === null) {
        return res.status(404).json({ error: "Post não encontrado!" });
      }

      const isCommentRegistered: IComments | null = await Comments.findOne({
        where: {
          [Op.and]: [
            {
              postId,
              userId,
              id: commentId,
            },
          ],
        },
      });

      if (isCommentRegistered === null) {
        return res.status(404).json({ error: "Comentario não encontrado!" });
      }

      const deletedComment: number = await Comments.destroy({
        where: {
          [Op.and]: [
            {
              postId,
              userId,
              id: commentId,
            },
          ],
        },
      });

      if (deletedComment === 0) {
        return res.status(500).json({ error: "Falha ao deletar comentario!" });
      }

      return res.status(204).send();
    } catch (err: unknown) {
      return res.status(500).json({ err });
    }
  }
}
