import User from "../models/userModel";

import IUsersInMemoryDB from "../../interfaces/IUsersInMemoryDB";

import { uuid } from "uuidv4";

import IUser from "../../interfaces/IUser";

class UsersInMemoryDB implements IUsersInMemoryDB {
  private users: Object[];
  async exists(email: string): Promise<boolean> {}
  async create(
    email: string,
    password: string,
    name: string,
    bornAt: string
  ): Promise<Object> {
    const user: Object = {
      id: String(uuid()),
      email,
      password,
      name,
      bornAt,
      admin: false,
    };
    this.users.push(user);

    return user;
  }
}
