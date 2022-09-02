import { mock } from "jest-mock-extended";

import IPost from "../../../src/interfaces/IPost";

import ILikes from "../../../src/interfaces/ILikes";

import { ModelStatic } from "sequelize";

import BadRequestError from "../../../src/errors/BadRequestError";

import InternalError from "../../../src/errors/InternalError";

import IDeletePostLikeService from "../../../src/interfaces/IDeletePostLikeService";
