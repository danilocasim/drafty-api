import db from "../prisma/queries/post.js";

class Post {
  async addPost(req, res) {
    const { user } = req.authData;
    const { title, content } = req.body;
    const newPost = await db.addPost(title, content, user.id);
    return res.json({ data: newPost });
  }

  async getAllPost(req, res) {
    const allPost = await db.getAllPost();
    return res.json({ data: allPost });
  }

  async editPost(req, res) {
    const { user } = req.authData;
    const { title, content } = req.body;
    const { postId } = req.params;
    const post = await db.editPost(title, content, postId, user.id);
    return res.json({ data: post });
  }

  async deletePost(req, res) {
    const { user } = req.authData;
    const { postId } = req.params;
    const post = await db.deletePost(postId, user.id);
    return res.json({ data: post });
  }

  async togglePublishPost(req, res) {
    const { user } = req.authData;
    const { postId } = req.params;
    const post = await db.togglePublishPost(postId, user.id);

    return res.json({ data: post });
  }

  async addComment(req, res) {
    const { user } = req.authData;
    const { postId } = req.params;
    const { content } = req.body;
    const comment = await db.addComment(content, postId, user.id);
    return res.json({ data: comment });
  }

  async getPostComments(req, res) {
    const { postId } = req.params;
    const allComments = await db.getAllComment(postId);
    return res.json({ data: allComments });
  }

  async editComment(req, res) {
    const { user } = req.authData;

    const { commentId, postId } = req.params;
    const { content } = req.body;
    const editedComment = await db.editComment(
      content,
      postId,
      commentId,
      user.id
    );

    return res.json({ data: editedComment });
  }

  async deleteComment(req, res) {
    const { user } = req.authData;
    const { commentId, postId } = req.params;
    const deletedComment = await db.deleteComment(commentId, postId, user.id);

    return res.json({ data: deletedComment });
  }
}

export default new Post();
