import User from "../database/models/userModel";

import Post from "../database/models/postModel";

import { Request, Response } from "express";

import IUser from "../types/userInterface";

import IPost from "../types/postInterface";

import bcrypt from "bcryptjs";

import {
  validateHandleAdminDeletePost,
  validateHandleAdminDeleteUser,
  validateHandleAdminEditUser,
} from "../validators/validateAdminData";

const handleAdminEditUser = async (req: Request, res: Response) => {
  const { error } = validateHandleAdminEditUser(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const userEmail: string = req.body.userEmail;

  const userNewEmail: string = req.body.userNewEmail;

  const userNewPassword: string = req.body.userNewPassword;

  const userNewName: string = req.body.userNewName;

  const userNewBornAt: string = req.body.userNewBornAt;

  try {
    const isUserRegistered: IUser | null = await User.findOne({
      where: { email: userEmail },
    });

    if (isUserRegistered === null) {
      return res.status(404).json({ error: "Usuario não encontrado!" });
    }

    const updatedUser: [affectedCount: number] = await User.update(
      {
        email: userNewEmail,
        password: bcrypt.hashSync(userNewPassword),
        name: userNewName,
        bornAt: userNewBornAt,
      },
      {
        where: { email: userEmail },
      }
    );

    if (updatedUser[0] === 0) {
      return res.status(500).json({ error: "Falha ao atualizar usuario!" });
    }

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

export { handleAdminEditUser };
