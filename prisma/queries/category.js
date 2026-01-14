import { prisma } from "../lib/prisma.js";

class Category {
  async getAllCategories() {
    return await prisma.category.findMany({
      include: {
        posts: {
          where: {
            isPublish: true,
          },
        },
      },
    });
  }

  async getMyPostsByCategoryId(categoryId) {
    return await prisma.post.findMany({
      where: {
        isPublish: true,
        categoryId: Number(categoryId),
      },
      include: {
        category: true,
      },
    });
  }
}

export default new Category();
