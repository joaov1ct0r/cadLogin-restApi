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

import { Model } from "sequelize";
