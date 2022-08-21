import IUser from "../interfaces/IUser";

export default interface IUsersInMemoryDB {
  create(
    email: string,
    password: string,
    name: string,
    bornAt: string
  ): Promise<IUser>;

  exists(email: string): Promise<boolean>;
}
