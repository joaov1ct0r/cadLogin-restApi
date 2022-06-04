import { Model } from "sequelize";

interface IPost extends Model {
  id: string;
  author: string;
  content: string;
  likes: number;
  comments: string;
}

export default IPost;
