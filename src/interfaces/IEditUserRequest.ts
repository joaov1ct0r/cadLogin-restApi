export default interface IEditUserRequest {
  email: string;
  password: string;
  name: string;
  bornAt: string;
  userId?: number;
}
