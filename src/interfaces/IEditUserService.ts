import IEditUserRequest from "./IEditUserRequest";

export default interface IEditUserService {
  execute({ email, password, name, bornAt }: IEditUserRequest): Promise<number>;
}
