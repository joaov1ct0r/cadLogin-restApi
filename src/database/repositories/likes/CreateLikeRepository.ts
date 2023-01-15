import { Likes, PrismaClient } from "@prisma/client";
import prismaClient from "../../prismaClient";
import ICreateLikeRepository from "../../../interfaces/ICreateLikeRepository";

export default class CreateLikeRepository implements ICreateLikeRepository {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prismaClient;
  }

  async execute(postId: number, author: string, id: number): Promise<Likes> {
    const createdLike: Likes = await this.repository.likes.create({
      data: {
        postId,
        likedBy: author,
        userId: id,
      },
    });

    return createdLike;
  }
}
