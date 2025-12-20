import { Router } from "express";
import articleController from "../controllers/article.js";
import authenticate from "../middlewares/auth.js";
import verifyToken from "../middlewares/verifyToken.js";

const articleRouter = Router();

articleRouter.post(
  "/",
  verifyToken,
  authenticate,
  articleController.addArticle
);

export default articleRouter;
