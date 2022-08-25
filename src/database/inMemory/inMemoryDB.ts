import ICreateUserRequest from "../../interfaces/ICreateUserRequest";

import IinMemoryDB from "../../interfaces/IinMemoryDB";

import IUser from "../../interfaces/IUser";

import { uuid } from "uuidv4";

export default class inMemoryDB implements IinMemoryDB {
  users: IUser[] = [];
  create(user: ICreateUserRequest): IUser {
    Object.assign(user, {
      id: uuid(),
    });

    this.users.push(user as IUser);

    return user as IUser;
  }

  findOne(email: string): IUser | null {
    const user = this.users.find((user) => user.email === email);

    if (user === undefined) return null;

    return user;
  }
}
