import db from "../prisma/queries/post.js";

class Post {
  async addPost(req, res) {
    const { user } = req.authData;
    const { title, content } = req.body;
    const newPost = await db.addPost(title, content, user.id);
    return res.json(newPost);
  }

  async getAllPost(req, res) {
    const allPost = await db.getAllPost();
    return res.json(allPost);
  }

  async editPost(req, res) {
    const { user } = req.authData;
    const { title, content } = req.body;
    const { postId } = req.params;
    const post = await db.editPost(title, content, postId, user.id);
    return res.json(post);
  }

  async deletePost(req, res) {
    const { user } = req.authData;
    const { postId } = req.params;
    const post = await db.deletePost(postId, user.id);
    return res.json(post);
  }

  async addComment(req, res) {
    const { user } = req.authData;
    const { postId } = req.params;
    const { content } = req.body;
    const comment = await db.addComment(content, postId, user.id);
    return res.json(comment);
  }

  async getPostComments(req, res) {
    const { postId } = req.params;
    const allComments = await db.getAllComment(postId);
    return res.json(allComments);
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

    return res.json(editedComment);
  }

  async deleteComment(req, res) {
    const { user } = req.authData;
    const { commentId, postId } = req.params;
    const deletedComment = await db.deleteComment(commentId, postId, user.id);

    return res.json(deletedComment);
  }
}

export default new Post();
