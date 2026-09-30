import { add } from "winston";
import type { Address, User } from "../../generated/prisma/client";
import { prisma } from "../application/database";
import { ResponseError } from "../error/response";
import {
  toAddressResponse,
  type modelAddressCreate,
  type modelAddressResponse,
  type modelIdRequest,
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

  static async checkAddress(
    username: string,
    contactId: number,
    id: number,
  ): Promise<Address> {
    const address = await prisma.address.findFirst({
      where: {
        contact: { username: username },
        id_contact: contactId,
        id: id,
      },
    });
    if (!address) {
      throw new ResponseError(404, "address not found");
    }
    return address;
  }

  static async Get(
    user: User,
    idReq: modelIdRequest,
  ): Promise<modelAddressResponse> {
    const validRequest = Validation.validate(AddressValidation.get, idReq);
    const existContact = await contactServices.checkContact(
      user,
      idReq.contactId,
    );

    const response = await this.checkAddress(
      existContact.username,
      validRequest.contactId,
      validRequest.id,
    );

    return toAddressResponse(response);
  }
}
