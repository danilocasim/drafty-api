import { prisma } from "../lib/prisma.js";

class Post {
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
    return await prisma.post.findMany();
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

export default new Post();
