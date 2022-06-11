import { Model } from "sequelize";

interface ILikes extends Model {
  postId: string;
  id: number;
  likedBy: string;
}

export default ILikes;
