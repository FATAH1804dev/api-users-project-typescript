import type { Address, User } from "../../generated/prisma/client";
import { prisma } from "../application/database.ts";
import { ResponseError } from "../error/response.ts";
import {
  toAddressResponse,
  type modelAddressCreate,
  type modelAddressResponse,
  type modelAddressUpdate,
  type modelIdRequest,
} from "../model/address.ts";
import { AddressValidation } from "../validation/address.ts";
import { Validation } from "../validation/validation.ts";
import { contactServices } from "./contactService.ts";

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

  static async Update(
    user: User,
    req: modelAddressUpdate,
  ): Promise<modelAddressResponse> {
    const validRequest = Validation.validate(AddressValidation.update, req);
    const existContact = await contactServices.checkContact(
      user,
      req.contactId,
    );
    const existAddress = await this.checkAddress(
      existContact.username,
      validRequest.contactId,
      validRequest.id,
    );

    const response = await prisma.address.update({
      where: {
        id: existAddress.id,
      },
      data: {
        ...(validRequest.street !== undefined
          ? { street: validRequest.street }
          : {}),
        ...(validRequest.city !== undefined ? { city: validRequest.city } : {}),
        ...(validRequest.province !== undefined
          ? { province: validRequest.province }
          : {}),
        ...(validRequest.country !== undefined && validRequest.country !== null
          ? { country: validRequest.country }
          : {}),
        ...(validRequest.postal_code !== undefined &&
        validRequest.postal_code !== null
          ? { postal_code: validRequest.postal_code }
          : {}),
      },
    });
    console.info(response);

    return toAddressResponse(response);
  }

  static async Remove(
    user: User,
    idReq: modelIdRequest,
  ): Promise<modelAddressResponse> {
    const validRequest = Validation.validate(AddressValidation.remove, idReq);
    const existContact = await contactServices.checkContact(
      user,
      idReq.contactId,
    );

    const existAddress = await this.checkAddress(
      existContact.username,
      validRequest.contactId,
      validRequest.id,
    );

    const response = await prisma.address.delete({
      where: {
        id: existAddress.id,
      },
    });

    return toAddressResponse(response);
  }

  static async List(
    user: User,
    contactId: number,
  ): Promise<Array<modelAddressResponse>> {
    const existContact = await contactServices.checkContact(user, contactId);

    const addresses = await prisma.address.findMany({
      where: {
        id_contact: existContact.id,
      },
    });
    const perAddress = addresses.map((address) => toAddressResponse(address));

    return perAddress;
  }
}
