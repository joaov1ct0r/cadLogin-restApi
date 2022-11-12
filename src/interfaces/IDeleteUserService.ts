import { User } from "@prisma/client";

export default interface IDeleteUserService {
  execute(id: number | undefined): Promise<User>;
}
