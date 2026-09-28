import { prisma } from "../src/application/database";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import type { User } from "../generated/prisma/client";

export const disconnect = async () => {
  await prisma.$disconnect();
};

export class UserTest {
  static async deleteUsers() {
    await prisma.user.deleteMany({
      where: {
        name: {
          contains: "test",
        },
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

  static async loggedInUser() {
    const user = await prisma.user.create({
      data: {
        username: "Ruzcen",
        password: await bcrypt.hash("rahasiakita", 10),
        name: "test",
        token: uuid(),
      },
    });
  }

  static async getUser() {
    const user = await prisma.user.findFirst({
      where: {
        name: "test",
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
