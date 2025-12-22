import db from "../prisma/queries/article.js";

class Article {
  async addPost(req, res) {
    const { user } = req.authData;
    const { title, content } = req.body;
    const newPost = await db.addPost(title, content, user.id);
    return res.json(newPost);
  }

  async getAllPost(req, res) {
    const { user } = req.authData;
    const allPost = await db.getAllPost(user.id);
    return res.json(allPost);
  }

  async editPost(req, res) {
    const { user } = req.authData;
    const { title, content } = req.body;
    const { articleId } = req.params;
    const post = await db.editPost(title, content, articleId, user.id);
    return res.json(post);
  }

  async deletePost(req, res) {
    const { user } = req.authData;
    const { articleId } = req.params;
    const post = await db.deletePost(articleId, user.id);
    return res.json(post);
  }
}

export default new Article();
