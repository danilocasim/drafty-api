import { Router } from "express";
import articleController from "../controllers/article.js";
import authenticate from "../middleware/auth.js";
import verifyToken from "../middleware/verifyToken.js";

const articleRouter = Router();

articleRouter.post("/", verifyToken, authenticate, articleController.addPost);
articleRouter.get("/", verifyToken, authenticate, articleController.getAllPost);
articleRouter.put(
  "/:articleId",
  verifyToken,
  authenticate,
  articleController.editPost
);

articleRouter.delete(
  "/:articleId",
  verifyToken,
  authenticate,
  articleController.deletePost
);

export default articleRouter;
