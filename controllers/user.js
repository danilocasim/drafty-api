import db from "../prisma/queries/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

class User {
  async addUser(req, res) {
    const user = await db.addUser(req.body);
    res.json(user);
  }

  async checkUser(req, res) {
    const { email, password } = req.body;
    const user = await db.checkUser(email);
    const { SECRET_KEY } = process.env;

    if (bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "1hr" });
      return res.status(200).json({
        message: "Auth Passed",
        token,
      });
    }
    return res.status(401).json({ message: "Auth Failed" });
  }
}

export default new User();
