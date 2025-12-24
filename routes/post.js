import { Router } from "express";
import postController from "../controllers/post.js";
import authenticate from "../middleware/authentication.js";
import verifyToken from "../middleware/verifyToken.js";
import authorize from "../middleware/authorization.js";

const postRouter = Router();

postRouter.post("/", verifyToken, authenticate, postController.addPost);
postRouter.get("/", verifyToken, authenticate, postController.getAllPost);
postRouter.put(
  "/:postId",
  verifyToken,
  authenticate,
  authorize.post,
  postController.editPost
);

postRouter.delete(
  "/:postId",
  verifyToken,
  authenticate,
  authorize.post,
  postController.deletePost
);

postRouter.put(
  "/:postId/publish",
  verifyToken,
  authenticate,
  authorize.post,
  postController.togglePublishPost
);

postRouter.post(
  "/:postId/comment",
  verifyToken,
  authenticate,
  postController.addComment
);

postRouter.get(
  "/:postId/comment",
  verifyToken,
  authenticate,
  postController.getPostComments
);

postRouter.put(
  "/:postId/comment/:commentId",
  verifyToken,
  authenticate,
  authorize.comment,
  postController.editComment
);

postRouter.delete(
  "/:postId/comment/:commentId",
  verifyToken,
  authenticate,
  authorize.comment,
  postController.deleteComment
);

export default postRouter;
