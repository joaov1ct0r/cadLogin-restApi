import IUser from "./IUser";

export default interface IListAllUsersService {
  execute(): Promise<IUser[]>;
}
