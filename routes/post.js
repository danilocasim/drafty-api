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

export default postRouter;
