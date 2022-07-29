export default interface IEditUserRequest {
  email: string;
  password: string;
  name: string;
  bornAt: string;
  id: string | undefined;
}
