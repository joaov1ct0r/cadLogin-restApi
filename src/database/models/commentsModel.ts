import DB from "../config/database";

import { ModelStatic, DataTypes } from "sequelize";

import IComments from "../../types/commentsInterface";

import Post from "./postModel";

const Comments: ModelStatic<IComments> = DB.define(
  "comments",
  {
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "comments",
    timestamps: false,
  }
);

Comments.belongsTo(Post, {
  constraints: true,
  foreignKey: "postId",
});

Post.hasMany(Comments, {
  foreignKey: "postId",
});

Comments.sync();

export default Comments;
