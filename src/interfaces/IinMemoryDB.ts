import ICreateUserRequest from "./ICreateUserRequest";

import IUser from "./IUser";

export default interface IinMemoryDB {
  users: IUser[];
  create(user: ICreateUserRequest): IUser;
  findOne(email: string): IUser | null;
}
