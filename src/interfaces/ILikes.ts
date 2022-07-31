import { Model } from "sequelize";

interface ILikes extends Model {
  postId: string;
  userId: string;
  id: string;
  likedBy: string;
}

export default ILikes;
