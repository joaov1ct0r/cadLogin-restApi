import { Model } from "sequelize";

interface IComments extends Model {
  postId: string;
  id: string;
  author: string;
  comment: string;
}

export default IComments;
