import { Model } from "sequelize";

interface IPost extends Model {
  id: string;
  author: string;
  content: string;
  userId: string;
}

export default IPost;
