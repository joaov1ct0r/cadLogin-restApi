import { User } from "@prisma/client";

export default interface IAdminDeleteUserRepository {
  execute(user: User): Promise<void>;
}
