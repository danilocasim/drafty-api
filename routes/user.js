import { Router } from "express";
import userController from "../controllers/user.js";
import checkCredentials from "../middleware/checkCredentials.js";
import verifyToken from "../middleware/verifyToken.js";
import authenticate from "../middleware/authentication.js";

const userRouter = Router();

userRouter.get("/", (req, res) => res.json({ message: "Hello World" }));
userRouter.get("/auth", verifyToken, authenticate, (req, res) => {
  const { user } = req.authData;
  res.status(200).json({ user: user.username });
});
userRouter.post("/signup", checkCredentials, userController.addUser);
userRouter.post("/login", userController.checkUser);

export default userRouter;
