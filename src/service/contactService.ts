import type { User } from "../../generated/prisma/client";
import { prisma } from "../application/database";
import { ResponseError } from "../error/response";
import {
  toContactResponse,
  type modelCreateContact,
  type modelResponseContact,
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

  static async Get(
    user: User,
    contactId: number,
  ): Promise<modelResponseContact> {
    const checkContact = await prisma.contact.findUnique({
      where: {
        id: contactId,
        username: user.username,
      },
    });
    if (!checkContact) {
      throw new ResponseError(404, "contact not found");
    }

    return toContactResponse(checkContact);
  }
}
