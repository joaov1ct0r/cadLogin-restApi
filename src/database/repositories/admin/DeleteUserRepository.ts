interface IAdminDeleteUserRepository {
  execute(email: string): Promise<void>;
}

export default class AdminDeleteUserRepository
  implements IAdminDeleteUserRepository
{
  execute(email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
