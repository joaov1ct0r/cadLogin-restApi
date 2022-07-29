import ICreateUserRequest from "./CreateUserRequestInterface";

import IUser from "./userInterface";

export default interface ICreateUserService {
  execute({
    email,
    password,
    name,
    bornAt,
  }: ICreateUserRequest): Promise<IUser>;
}
