import { prisma } from "../lib/prisma.js";

class Article {
  async addPost(title, content, userId) {
    return await prisma.post.create({
      data: {
        title: title,
        content: content,
        userId: userId,
      },
    });
  }
  async getAllPost(userId) {
    return await prisma.post.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async editPost(title, content, postId, userId) {
    return await prisma.post.update({
      where: {
        userId: userId,
        id: Number(postId),
      },
      data: {
        title: title,
        content: content,
      },
    });
  }

  async deletePost(postId, userId) {
    return await prisma.post.delete({
      where: {
        userId: userId,
        id: Number(postId),
      },
    });
  }
}

export default new Article();
