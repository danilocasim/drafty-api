class Article {
  async addArticle(req, res) {
    return res.json({
      message: "Post Created",
      user: req.authData.user.username,
    });
  }
}

export default new Article();
