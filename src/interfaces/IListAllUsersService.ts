import { User } from "@prisma/client";

export default interface IListAllUsersService {
  execute(): Promise<User[]>;
}
