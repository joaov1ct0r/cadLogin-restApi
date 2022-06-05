import User from "../database/models/userModel";

import Post from "../database/models/postModel";

import {
  validateHandleUserRegister,
  validateHandleUserLogin,
  validateHandleUserEdit,
  validateHandleOneUser,
} from "../validators/validateUserData.js";

import IReq from "../types/requestInterface";

import { Request, Response } from "express";

import { Model } from "sequelize";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import IUser from "../types/userInterface";

const handleUserRegister = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleUserRegister(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const email: string = req.body.email;

  const password: string = req.body.password;

  const name: string = req.body.name;

  const bornAt: string = req.body.bornAt;
  try {
    const isUserRegistered: IUser | null = await User.findOne({
      where: { email },
    });

    if (isUserRegistered === null) {
      return res.status(400).json({ error: "Usuario já cadastrado!" });
    }

    const newUser: IUser = await User.create({
      email,
      password: bcrypt.hashSync(password),
      name,
      bornAt,
    });

    return res.status(201).json({ newUser });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

const handleUserLogin = async (req: Request, res: Response) => {
  const { error } = validateHandleUserLogin(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const email: string = req.body.email;

  const password: string = req.body.password;

  try {
    const isUserRegistered: IUser | null = await User.findOne({
      where: { email },
    });

    if (isUserRegistered === null) {
      return res.status(404).json({ error: "Usuario não encontrado!" });
    }

    const matchingPasswords: boolean = bcrypt.compareSync(
      password,
      isUserRegistered.password
    );

    if (matchingPasswords === false) {
      return res.status(401).json({ error: "Falha na autenticação!" });
    }

    const token: string = jwt.sign(
      { id: isUserRegistered.id, admin: isUserRegistered.admin },
      process.env.NODE_ENV_TOKEN_SECRET as string,
      { expiresIn: 300 }
    );

    res.cookie("authorization", `Bearer ${token}`, { httpOnly: true });

    return res.status(200).json({ message: "Login realizado com sucesso!" });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

const handleUserEdit = async (req: IReq, res: Response) => {
  const { error } = validateHandleUserEdit(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const email: string = req.body.email;

  const password: string = req.body.password;

  const name: string = req.body.name;

  const bornAt: string = req.body.bornAt;

  const id: string | undefined = req.userId;

  try {
    const editedUser: [affectedCount: number] = await User.update(
      {
        email,
        password: bcrypt.hashSync(password),
        name,
        bornAt,
      },
      { where: { id } }
    );

    if (editedUser[0] === 0) {
      return res.status(500).json({ error: "Falha ao atualizar usuario!" });
    }

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

const handleUserDelete = async (req: IReq, res: Response) => {
  const id: string | undefined = req.userId;

  try {
    const deletedUser: number = await User.destroy({
      where: { id },
    });

    if (deletedUser === 0) {
      return res.status(500).json({ error: "Falha ao deletar usuario!" });
    }

    // eslint-disable-next-line no-unused-vars
    const deletedPost: number = await Post.destroy({
      where: { userId: id },
    });

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

export { handleUserRegister, handleUserLogin, handleUserEdit };
