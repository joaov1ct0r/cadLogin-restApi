import { User } from "@prisma/client";
import ICreateUserRequest from "./ICreateUserRequest";

export default interface ICreateUserService {
  execute({ email, password, name, bornAt }: ICreateUserRequest): Promise<User>;
}
