import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

class User {
  async addUser({ email, password, role, username }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        role: role,
        username: username,
      },
    });
  }

  async checkUser(email) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async getUserByUsername(username) {
    return await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }
}

export default new User();
