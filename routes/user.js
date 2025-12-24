import { Router } from "express";
import userController from "../controllers/user.js";

const userRouter = Router();

userRouter.get("/", (req, res) => res.json({ message: "Hello World" }));
userRouter.post("/signup", userController.addUser);
userRouter.post("/login", userController.checkUser);

export default userRouter;
