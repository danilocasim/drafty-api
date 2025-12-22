import { Router } from "express";
import postController from "../controllers/post.js";
import authenticate from "../middleware/auth.js";
import verifyToken from "../middleware/verifyToken.js";

const postRouter = Router();

postRouter.post("/", verifyToken, authenticate, postController.addPost);
postRouter.get("/", verifyToken, authenticate, postController.getAllPost);
postRouter.put("/:postId", verifyToken, authenticate, postController.editPost);

postRouter.delete(
  "/:postId",
  verifyToken,
  authenticate,
  postController.deletePost
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
  postController.editComment
);

postRouter.delete(
  "/:postId/comment/:commentId",
  verifyToken,
  authenticate,
  postController.deleteComment
);

export default postRouter;
