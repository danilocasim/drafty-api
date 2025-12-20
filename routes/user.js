import { Router } from "express";
import userController from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/signup", userController.addUser);
userRouter.post("/login", userController.checkUser);

export default userRouter;
