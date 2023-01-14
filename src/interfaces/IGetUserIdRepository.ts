import { User } from "@prisma/client";

export default interface IGetUserIdRepository {
  execute(id: number): Promise<User | null>;
}
