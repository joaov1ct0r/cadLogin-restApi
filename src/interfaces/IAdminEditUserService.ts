export default interface IAdminEditUserService {
  execute(
    userEmail: string,
    userNewEmail: string,
    userNewPassword: string,
    userNewName: string,
    userNewBornAt: string
  ): Promise<Object>;
}
