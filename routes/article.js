import { Router } from "express";
import articleController from "../controllers/article.js";
import authenticate from "../middleware/auth.js";
import verifyToken from "../middleware/verifyToken.js";

const articleRouter = Router();

articleRouter.post(
  "/",
  verifyToken,
  authenticate,
  articleController.addArticle
);

export default articleRouter;
