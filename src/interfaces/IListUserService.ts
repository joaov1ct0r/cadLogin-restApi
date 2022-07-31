import IUser from "./IUser";

export default interface IListUserService {
  execute(email: string): Promise<IUser>;
}
