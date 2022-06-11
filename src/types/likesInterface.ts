import { Model } from "sequelize";

interface ILikes extends Model {
  postId: string;
  likedBy: string;
}

export default ILikes;
