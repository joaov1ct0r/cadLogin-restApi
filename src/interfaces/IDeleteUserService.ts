export default interface IDeleteUserService {
  execute(id: string | undefined): Promise<number>;
}
