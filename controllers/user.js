import db from '../prisma/queries/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class User {
  async addUser(req, res) {
    const user = await db.addUser(req.body);
    res.json({ data: user });
  }

  async checkUser(req, res) {
    const { email, password } = req.body;
    const user = await db.checkUser(email);
    const { SECRET_KEY } = process.env;

    if (!user) {
      return res.status(403).json({
        message: 'User does not exist',
      });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '1hr' });
      return res.status(200).json({
        message: 'Auth Passed',
        token,
        user,
      });
    }
    return res
      .status(401)
      .json({ error: { code: 401, message: 'Wrong Credentials' } });
  }
}

export default new User();
