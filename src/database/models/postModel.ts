import DB from "../config/database";

import User from "./userModel";

import { ModelStatic, DataTypes } from "sequelize";

import IPost from "../../interfaces/IPost";

const Post: ModelStatic<IPost> = DB.define(
  "posts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "posts",
    timestamps: false,
  }
);

Post.belongsTo(User, {
  constraints: true,
  foreignKey: "userId",
});

User.hasMany(Post, {
  foreignKey: "userId",
});

Post.sync();

export default Post;
