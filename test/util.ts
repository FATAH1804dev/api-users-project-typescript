import { prisma } from "../src/application/database";

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
}
