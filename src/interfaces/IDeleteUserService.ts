export default interface IDeleteUserService {
  execute(id: number | undefined): Promise<Object>;
}
