import jwt from "jsonwebtoken";
import "dotenv/config";

export default function authenticate(req, res, next) {
  const { SECRET_KEY } = process.env;
  jwt.verify(req.token, SECRET_KEY, (err, authData) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Token Expired" });
    } else {
      req.authData = authData;
      next();
    }
  });
}
