import { prisma } from "../src/application/database";
import bcrypt from "bcrypt";

export const disconnect = async () => {
  await prisma.$disconnect();
};

export class UserTest {
  static async deleteUsers() {
    await prisma.user.deleteMany({
      where: {
        name: "test",
      },
    });
  }

  static async createUser() {
    await prisma.user.create({
      data: {
        username: "Yaschor",
        password: await bcrypt.hash("rahasiakita", 10),
        name: "test",
      },
    });
  }
}
