import IUser from "./userInterface";

export default interface IListAllUsersService {
  execute(): Promise<IUser[]>;
}
