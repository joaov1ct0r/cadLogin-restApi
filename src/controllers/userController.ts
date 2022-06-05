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

const handleUserRegister = async (req: Request, res: Response) => {
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

const login = async (req, res) => {
  const { error } = loginValidate(req.body);

  if (error) {
    return res.status(400).send("Falha na autenticação");
  }
  const selectedUser = await User.findOne({ email: req.body.email });

  if (!selectedUser) return res.status(400).send("Falha na autenticação");

  const passwordCompare = bcrypt.compareSync(
    req.body.password,
    selectedUser.password
  );

  if (!passwordCompare) return res.status(400).send("Falha na autenticação");

  const token = jwt.sign(
    { id: selectedUser.id, admin: selectedUser.admin },
    process.env.NODE_ENV_TOKEN_SECRET
  );
  res.header("auth-token", token);

  res.send("Login realizado com sucesso");
};

export { login, register };
