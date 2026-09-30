import type { Contact, User } from "../../generated/prisma/client";
import { prisma } from "../application/database.ts";
import { ResponseError } from "../error/response.ts";
import {
  toContactResponse,
  type modelCreateContact,
  type modelResponseContact,
  type modelResponseSearchContact,
  type modelSearchContact,
  type modelUpdateContact,
} from "../model/contact.ts";
import { ContactValidation } from "../validation/contact.ts";
import { Validation } from "../validation/validation.ts";

export class contactServices {
  static async Create(
    user: User,
    req: modelCreateContact,
  ): Promise<modelResponseContact> {
    const validRequest = Validation.validate(ContactValidation.create, req);

    const newContact = await prisma.contact.create({
      data: {
        firstname: validRequest.firstname,
        ...(validRequest.lastname !== undefined
          ? { lastname: validRequest.lastname }
          : {}),
        ...(validRequest.email !== undefined
          ? { email: validRequest.email }
          : {}),
        phone: validRequest.phone,
        username: user.username,
      },
    });

    return toContactResponse(newContact);
  }

  static async checkContact(user: User, id: number): Promise<Contact> {
    const contact = await prisma.contact.findUnique({
      where: {
        id: id,
        username: user.username,
      },
    });
    if (!contact) {
      throw new ResponseError(404, "contact not found");
    }
    return contact;
  }

  static async Get(
    user: User,
    contactId: number,
  ): Promise<modelResponseContact> {
    const existContact = await this.checkContact(user, contactId);

    return toContactResponse(existContact);
  }

  static async Update(
    user: User,
    req: modelUpdateContact,
  ): Promise<modelResponseContact> {
    const validRequest = Validation.validate(ContactValidation.update, req);
    const existContact = await this.checkContact(user, validRequest.id);

    const updateContact = await prisma.contact.update({
      where: {
        id: existContact.id,
        username: existContact.username,
      },
      data: {
        ...(validRequest.firstname !== undefined
          ? { firstname: validRequest.firstname }
          : {}),
        ...(validRequest.lastname !== undefined
          ? { lastname: validRequest.lastname }
          : {}),
        ...(validRequest.email !== undefined
          ? { email: validRequest.email }
          : {}),
        ...(validRequest.phone !== undefined
          ? { phone: validRequest.phone }
          : {}),
      },
    });

    return toContactResponse(updateContact);
  }

  static async Remove(
    user: User,
    contactId: number,
  ): Promise<modelResponseContact> {
    const existContact = await this.checkContact(user, contactId);

    const removedContact = await prisma.contact.delete({
      where: {
        id: existContact.id,
        username: existContact.username,
      },
    });

    return toContactResponse(removedContact);
  }

  static async Search(
    user: User,
    req: modelSearchContact,
  ): Promise<modelResponseSearchContact> {
    const validRequest = Validation.validate(ContactValidation.search, req);
    const filter = [];
    if (validRequest.name) {
      filter.push({
        OR: [
          {
            firstname: {
              contains: validRequest.name,
            },
          },
          {
            lastname: {
              contains: validRequest.name,
            },
          },
        ],
      });
    }

    if (validRequest.email) {
      filter.push({
        email: { contains: validRequest.email },
      });
    }

    if (validRequest.phone) {
      filter.push({
        phone: { contains: validRequest.phone },
      });
    }

    const searchContacts = await prisma.contact.findMany({
      where: {
        username: user.username,
        AND: filter,
      },
      skip: (validRequest.page - 1) * validRequest.size,
      take: validRequest.size,
    });

    const totalContact = await prisma.contact.count({
      where: {
        username: user.username,
        AND: filter,
      },
    });

    const perContact = searchContacts.map((contact) =>
      toContactResponse(contact),
    );

    const response = {
      data: perContact,
      paging: {
        current_page: validRequest.page,
        total_page: Math.ceil(totalContact / validRequest.size),
        size: validRequest.size,
      },
    };

    return response;
  }
}
