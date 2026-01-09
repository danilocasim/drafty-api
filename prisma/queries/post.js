import { prisma } from "../lib/prisma.js";

class Post {
  async addPost(
    title,
    description,
    content,
    isPublish,
    userId,
    categoryName = "Personal"
  ) {
    return await prisma.post.create({
      data: {
        title: title,
        content: content,
        description: description,
        isPublish: isPublish,
        User: {
          connect: {
            id: userId,
          },
        },
        category: {
          connectOrCreate: {
            where: {
              name: categoryName,
            },
            create: {
              name: categoryName,
              userId: userId,
            },
          },
        },
      },
      include: { category: true },
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
      include: { category: true },
    });
  }

  async getMyAllPrivatePost(userId) {
    return await prisma.post.findMany({
      where: { userId: userId, isPublish: false },
      include: { category: true },
    });
  }

  async getMyPost(postId, userId) {
    return await prisma.post.findUnique({
      where: { id: Number(postId), userId: userId },
      include: { category: true },
    });
  }

  async editPost(
    title,
    description,
    content,
    postId,
    isPublish,
    userId,
    categoryName
  ) {
    return await prisma.post.update({
      where: {
        userId: userId,
        id: Number(postId),
      },
      data: {
        title: title,
        content: content,
        description: description,
        isPublish: isPublish,
        category: {
          connect: {
            name: categoryName,
          },
        },
      },
    });
  }

  async deletePost(postId, userId) {
    const deletedPost = await prisma.post.delete({
      where: {
        userId: userId,
        id: Number(postId),
      },
    });

    const category = await prisma.category.findUnique({
      where: {
        id: deletedPost.categoryId,
      },
      include: {
        posts: true,
      },
    });

    if (category.posts.length === 0) {
      await prisma.category.delete({
        where: {
          id: category.id,
        },
      });
    }

    return deletedPost;
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
      orderBy: [{ id: "asc" }],
      where: {
        postId: Number(postId),
      },
      include: {
        User: {
          select: {
            username: true,
          },
        },
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

  async deleteComment(commentId, postId) {
    return await prisma.comment.delete({
      where: {
        postId: Number(postId),
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
