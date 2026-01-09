import { Router } from "express";
import categoryController from "../controllers/category.js";

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:categoryId", categoryController.getMyPostsByCategoryId);

export default categoryRouter;
