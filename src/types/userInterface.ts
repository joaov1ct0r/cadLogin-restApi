import { Model } from "sequelize";

interface IUser extends Model {
  email: string;
  senha: string;
  nome: string;
  idade: string;
  admin: boolean;
}

export default IUser;
