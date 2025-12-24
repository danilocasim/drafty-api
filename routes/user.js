import { Router } from "express";
import userController from "../controllers/user.js";
import checkCredentials from "../middleware/checkCredentials.js";

const userRouter = Router();

userRouter.get("/", (req, res) => res.json({ message: "Hello World" }));
userRouter.post("/signup", checkCredentials, userController.addUser);
userRouter.post("/login", userController.checkUser);

export default userRouter;
