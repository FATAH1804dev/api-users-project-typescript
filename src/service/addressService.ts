import type { User } from "../../generated/prisma/client";
import { prisma } from "../application/database";
import { ResponseError } from "../error/response";
import {
  toAddressResponse,
  type modelAddressCreate,
  type modelAddressResponse,
} from "../model/address";
import { AddressValidation } from "../validation/address";
import { Validation } from "../validation/validation";
import { contactServices } from "./contactService";

export class AddressServices {
  static async Create(
    user: User,
    req: modelAddressCreate,
  ): Promise<modelAddressResponse> {
    const validRequest = Validation.validate(AddressValidation.create, req);
    const existContact = await contactServices.checkContact(
      user,
      req.contactId,
    );

    const response = await prisma.address.create({
      data: {
        ...(validRequest.street !== undefined
          ? { street: validRequest.street }
          : {}),
        ...(validRequest.city !== undefined ? { city: validRequest.city } : {}),
        ...(validRequest.province !== undefined
          ? { province: validRequest.province }
          : {}),
        country: validRequest.country,
        postal_code: validRequest.postal_code,
        id_contact: existContact.id,
      },
    });

    return toAddressResponse(response);
  }
}
