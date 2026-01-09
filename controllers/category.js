import db from "../prisma/queries/category.js";

class Category {
  async getAllCategories(req, res) {
    const categories = await db.getAllCategories();
    return res.json({ data: categories });
  }

  async getMyPostsByCategoryId(req, res) {
    const { categoryId } = req.params;
    const posts = await db.getMyPostsByCategoryId(categoryId);
    return res.json({ data: posts });
  }
}

export default new Category();
