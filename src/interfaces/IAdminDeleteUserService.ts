export default interface IAdminDeleteUserService {
  execute(userEmail: string): Promise<Object>;
}
