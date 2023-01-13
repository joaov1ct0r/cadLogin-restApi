import { User } from "@prisma/client";

export default interface IGetUserEmailRepository {
  execute(email: string): Promise<User | null>;
}
