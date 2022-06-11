import { Model } from "sequelize";

interface IComments extends Model {
  postId: string;
  author: string;
  comment: string;
}

export default IComments;
