export default interface IDeleteUserRepository {
  execute(id: number): Promise<void>;
}
