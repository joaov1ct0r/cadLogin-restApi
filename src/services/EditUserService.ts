import User from "../database/models/userModel";

import IEditUserRequest from "../interfaces/IEditUserRequest";

import bcrypt from "bcryptjs";

export default class EditUserService {
  async execute({
    email,
    password,
    name,
    bornAt,
    id,
  }: IEditUserRequest): Promise<number> {
    try {
      const editedUser: [affectedCount: number] = await User.update(
        {
          email,
          password: bcrypt.hashSync(password),
          name,
          bornAt,
        },
        {
          where: { id },
        }
      );

      if (editedUser[0] === 0) {
        throw new Error("Falha ao atualizar usuario!");
      }

      return Number(editedUser);
    } catch (err: unknown) {
      throw new Error("Erro interno!");
    }
  }
}
