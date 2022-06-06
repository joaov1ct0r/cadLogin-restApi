import DB from "../config/database";

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

Post.sync();

export default Post;
