import { User } from "@prisma/client";

export default interface IListUserService {
  execute(email: string): Promise<User>;
}
