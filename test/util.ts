import { prisma } from "../src/application/database";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import type { User } from "../generated/prisma/client";
import { ResponseError } from "../src/error/response";

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

export class ContactTest {
  static async deleteAll() {
    await prisma.contact.deleteMany({
      where: {
        firstname: {
          contains: "test",
        },
      },
    });
  }

  static async createContact() {
    await prisma.contact.create({
      data: {
        firstname: "test",
        lastname: "Yory",
        email: "yory432@gmail.com",
        phone: "625648839243",
        username: "Ruzcen",
      },
    });
  }

  static async getContact() {
    const user = await UserTest.getUser();
    const contact = await prisma.contact.findFirst({
      where: {
        username: user.username,
        firstname: "test",
      },
    });
    if (!contact) {
      throw new Error("contact not found");
    }
    return contact;
  }
}

export class AddressTest {
  static async deleteAll() {
    await prisma.address.deleteMany({
      where: {
        country: {
          contains: "test",
        },
      },
    });
  }

  static async createAddress() {
    const contact = await ContactTest.getContact();
    await prisma.address.create({
      data: {
        street: "Capoyurwyerns .st",
        city: "Kcysyl",
        province: "Tednuock",
        country: "test",
        postal_code: "244764",
        id_contact: contact.id,
      },
    });
  }

  static async getAddress() {
    const contact = await ContactTest.getContact();
    const address = await prisma.address.findFirst({
      where: {
        id_contact: contact.id,
        country: "test",
      },
    });
    if (!address) {
      throw new Error("address not found");
    }
    return address;
  }
}
