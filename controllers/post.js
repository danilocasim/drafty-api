import db from "../prisma/queries/post.js";

class Post {
  async addPost(req, res) {
    const { user } = req.authData;
    const { title, description, content, isPublish, categoryName } = req.body;
    const newPost = await db.addPost(
      title,
      description,
      content,
      isPublish,
      user.id,
      categoryName
    );
    return res.json({ data: newPost });
  }

  async getAllPost(req, res) {
    const allPost = await db.getAllPost();
    return res.json({ data: allPost });
  }
  async getMyAllPost(req, res) {
    const { user } = req.authData;
    const myAllPost = await db.getMyAllPost(user.id);
    return res.json({ data: myAllPost });
  }

  async getMyAllPublicPost(req, res) {
    const { user } = req.authData;
    const myAllPublicPost = await db.getMyAllPublicPost(user.id);
    return res.json({ data: myAllPublicPost });
  }

  async getMyAllPrivatePost(req, res) {
    const { user } = req.authData;
    const myAllPrivatePost = await db.getMyAllPrivatePost(user.id);
    return res.json({ data: myAllPrivatePost });
  }

  async getMyPost(req, res) {
    const { user } = req.authData;
    const { postId } = req.params;
    const myPost = await db.getMyPost(postId, user.id);
    return res.json({ data: myPost });
  }

  async editPost(req, res) {
    const { user } = req.authData;
    const { title, description, content, isPublish } = req.body;
    const { postId } = req.params;
    const post = await db.editPost(
      title,
      description,
      content,
      postId,
      isPublish,
      user.id
    );
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
    const { commentId, postId } = req.params;
    const deletedComment = await db.deleteComment(commentId, postId);

    return res.json({ data: deletedComment });
  }
}

export default new Post();
