import { prisma } from "../lib/prisma.js";

class Post {
  async addPost(title, content, isPublish, userId) {
    return await prisma.post.create({
      data: {
        title: title,
        content: content,
        isPublish: isPublish,
        userId: userId,
      },
    });
  }
  async getAllPost() {
    return await prisma.post.findMany();
  }
  async getMyAllPost(userId) {
    return await prisma.post.findMany({ where: { userId: userId } });
  }

  async getMyAllPublicPost(userId) {
    return await prisma.post.findMany({
      where: { userId: userId, isPublish: true },
    });
  }

  async getMyAllPrivatePost(userId) {
    return await prisma.post.findMany({
      where: { userId: userId, isPublish: false },
    });
  }

  async getMyPost(postId, userId) {
    return await prisma.post.findUnique({
      where: { id: Number(postId), userId: userId },
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

  async togglePublishPost(postId, userId) {
    const post = await prisma.post.findFirst({
      where: {
        id: Number(postId),
        userId: Number(userId),
      },
    });

    return await prisma.post.update({
      where: {
        id: Number(postId),
        userId: Number(userId),
      },
      data: {
        isPublish: !post.isPublish,
      },
    });
  }

  async addComment(content, postId, userId) {
    return await prisma.comment.create({
      data: {
        content: content,
        userId: userId,
        postId: Number(postId),
      },
    });
  }

  async getAllComment(postId) {
    return await prisma.comment.findMany({
      where: {
        postId: Number(postId),
      },
    });
  }

  async editComment(content, postId, commentId, userId) {
    return await prisma.comment.update({
      where: {
        id: Number(commentId),
        userId: Number(userId),
        postId: Number(postId),
      },
      data: {
        content: content,
      },
    });
  }

  async deleteComment(commentId, postId, userId) {
    return await prisma.comment.delete({
      where: {
        postId: Number(postId),
        userId: Number(userId),
        id: Number(commentId),
      },
    });
  }

  async getPostById(postId) {
    return await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });
  }

  async getCommentById(commentId) {
    return await prisma.comment.findUnique({
      where: {
        id: Number(commentId),
      },
    });
  }
}

export default new Post();
