import jwt from "jsonwebtoken";
import "dotenv/config";
import { env } from "../config/env.js";

export default function authenticate(req, res, next) {
  if (!env.jwtSecret) {
    return res
      .status(500)
      .json({ message: "Internal Server Error: JWT secret missing" });
  }

  jwt.verify(req.token, env.jwtSecret, (err, authData) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Token Expired" });
    } else {
      req.authData = authData;
      next();
    }
  });
}
