class Article {
  async addArticle(req, res) {
    console.log(req.user);
    return res.json({ message: "Post Created" });
  }
}

export default new Article();
