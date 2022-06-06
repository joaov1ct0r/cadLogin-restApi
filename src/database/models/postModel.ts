import DB from "../config/database";

import User from "./userModel";

import { ModelStatic, Model, DataTypes } from "sequelize";

const Post: ModelStatic<Model> = DB.define("posts", {
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
  likes: {
    type: DataTypes.ARRAY(DataTypes.STRING(250)),
  },
  comments: {
    type: DataTypes.ARRAY(DataTypes.STRING(250)),
  },
});

Post.belongsTo(User, {
  constraints: true,
  foreignKey: "userId",
});

User.hasMany(Post, {
  foreignKey: "userId",
});

Post.sync();

export default Post;
