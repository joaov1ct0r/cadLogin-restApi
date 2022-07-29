export default interface IAuthenticateUserService {
  execute(email: string, password: string): Promise<string>;
}
