export default function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    return res.status(403).json({ message: "Forbidden: No existing token" });
  }
}
