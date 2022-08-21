import IUsersInMemoryDB from "../../interfaces/IUsersInMemoryDB";

import { uuid } from "uuidv4";

import IUser from "../../interfaces/IUser";

export default class UsersInMemoryDB implements IUsersInMemoryDB {
  private users: IUser[] = [];
  async exists(email: string): Promise<boolean> {
    const response = this.users.some((user) => user.email === email);

    return response;
  }

  async create(user: IUser): Promise<IUser> {
    Object.assign(user, {
      id: uuid(),
    });

    this.users.push(user);

    return user;
  }
}
