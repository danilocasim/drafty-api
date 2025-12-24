import db from "../prisma/queries/user.js";

export default async function checkCredentials(req, res, next) {
  const { username, email } = req.body;
  const userByEmail = await db.checkUser(email);
  const userByUsername = await db.getUserByUsername(username);

  if (userByEmail && userByUsername) {
    return res.json({
      error: {
        code: "404",
        message: "email and username is already been used",
      },
    });
  }

  if (userByEmail) {
    return res.json({
      error: {
        code: "404",
        message: "email is already been used",
      },
    });
  }

  if (userByUsername) {
    return res.json({
      error: {
        code: "404",
        message: "username is already been used",
      },
    });
  }

  next();
}
