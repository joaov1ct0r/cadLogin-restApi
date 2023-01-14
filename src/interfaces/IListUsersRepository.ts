import { User } from "@prisma/client";

export default interface IListUsersRepository {
  execute(): Promise<User[]>;
}
