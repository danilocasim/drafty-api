import db from "../prisma/queries/post.js";

async function post(req, res, next) {
  const { user } = req.authData;
  const { postId } = req.params;

  const post = await db.getPostById(postId);

  if (post.userId === user.id) {
    next();
  } else {
    return res.json({
      error: { code: "403", message: "You are not authorize to this resource" },
    });
  }
}

async function comment(req, res, next) {
  const { user } = req.authData;
  const { commentId } = req.params;

  const comment = await db.getCommentById(commentId);

  if (comment.userId === user.id) {
    next();
  } else {
    return res.json({
      error: { code: "403", message: "You are not authorize to this resource" },
    });
  }
}

export default { post, comment };
