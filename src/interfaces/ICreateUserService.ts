import ICreateUserRequest from "./ICreateUserRequest";

import IUser from "./IUser";

export default interface ICreateUserService {
  execute({
    email,
    password,
    name,
    bornAt,
  }: ICreateUserRequest): Promise<IUser>;
}
