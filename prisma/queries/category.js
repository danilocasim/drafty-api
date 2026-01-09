import { prisma } from "../lib/prisma.js";

class Category {
  async getAllCategories() {
    return await prisma.category.findMany();
  }

  async getMyPostsByCategoryId(categoryId) {
    return await prisma.post.findMany({
      where: {
        categoryId: Number(categoryId),
      },
      include: {
        category: true,
      },
    });
  }
}

export default new Category();
