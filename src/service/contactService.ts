import type { Contact, User } from "../../generated/prisma/client";
import { prisma } from "../application/database";
import { ResponseError } from "../error/response";
import {
  toContactResponse,
  type modelCreateContact,
  type modelResponseContact,
  type modelUpdateContact,
} from "../model/contact";
import { ContactValidation } from "../validation/contact";
import { Validation } from "../validation/validation";

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
}
