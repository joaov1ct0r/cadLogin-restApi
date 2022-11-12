import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import { validateHandleUserRegister } from "../validations/validateUserData";
import prismaClient from "../database/prismaClient";
import ICreateUserController from "../interfaces/ICreateUserController";
import { User } from "@prisma/client";

export default class CreateUserController implements ICreateUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { error } = validateHandleUserRegister(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const email: string = req.body.email;

    const password: string = req.body.password;

    const name: string = req.body.name;

    const bornAt: string = req.body.bornAt;

    const createUserService: CreateUserService = new CreateUserService(
      prismaClient
    );

    try {
      const user: User = await createUserService.execute({
        email,
        password,
        name,
        bornAt,
      });

      return res.status(201).json({ user, status: 201 });
    } catch (err: any) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, status: err.statusCode });
    }
  }
}
