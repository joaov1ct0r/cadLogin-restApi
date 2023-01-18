export default interface IEditUserRepository {
  execute(
    email: string,
    password: string,
    name: string,
    bornAt: string,
    userId?: number
  ): Promise<void>;
}
