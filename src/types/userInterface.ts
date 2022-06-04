import { Model } from "sequelize";

interface IUser extends Model {
  id: string;
  email: string;
  password: string;
  name: string;
  bornAt: string;
  admin: boolean;
}

export default IUser;
