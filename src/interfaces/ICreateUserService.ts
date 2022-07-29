import ICreateUserRequest from "./ICreateUserRequest";

import IUser from "./userInterface";

export default interface ICreateUserService {
  execute({
    email,
    password,
    name,
    bornAt,
  }: ICreateUserRequest): Promise<IUser>;
}
