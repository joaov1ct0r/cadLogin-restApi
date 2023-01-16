export default interface IDeleteLikeRepository {
  execute(id: number, likeId: number): Promise<void>;
}
