import DB from "../config/database";

import { ModelStatic, DataTypes } from "sequelize";

import ILikes from "../../interfaces/likesInterface";

import Post from "./postModel";

const Likes: ModelStatic<ILikes> = DB.define(
  "likes",
  {
    likedBy: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
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
  },
  {
    freezeTableName: true,
    tableName: "likes",
    timestamps: false,
  }
);

Likes.belongsTo(Post, {
  constraints: true,
  foreignKey: "postId",
});

Post.hasMany(Likes, {
  foreignKey: "postId",
});

Likes.sync();

export default Likes;
