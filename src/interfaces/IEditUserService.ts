import { User } from "@prisma/client";
import IEditUserRequest from "./IEditUserRequest";

export default interface IEditUserService {
  execute({
    email,
    password,
    name,
    bornAt,
    userId,
  }: IEditUserRequest): Promise<User>;
}
