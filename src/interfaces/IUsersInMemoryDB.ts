import IUser from "../interfaces/IUser";

export default interface IUsersInMemoryDB {
  create(user: IUser): Promise<IUser>;

  exists(email: string): Promise<boolean>;
}
