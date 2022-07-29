import IUser from "./userInterface";

export default interface IListUserService {
  execute(email: string): Promise<IUser | null>;
}
