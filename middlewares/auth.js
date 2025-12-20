import jwt from "jsonwebtoken";
import "dotenv/config";

export default function authenticate(req, res, next) {
  const { SECRET_KEY } = process.env;
  jwt.verify(req.token, SECRET_KEY, (err, authData) => {
    if (err) {
      res.status(403);
    } else {
      req.user = authData;
      next();
    }
  });
}
