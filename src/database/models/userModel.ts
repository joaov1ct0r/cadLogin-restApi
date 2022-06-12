import DB from "../config/database";

import { ModelStatic, DataTypes } from "sequelize";

import IUser from "../../types/userInterface";

const User: ModelStatic<IUser> = DB.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    bornAt: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "users",
    timestamps: false,
  }
);

User.sync();

export default User;
