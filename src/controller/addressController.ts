import type { Request, Response, NextFunction } from "express";
import type { modelAddressCreate, modelIdRequest } from "../model/address";
import { AddressServices } from "../service/addressService";

export class AddressController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const contactId = Number(req.params.contactId);
      const request: modelAddressCreate = req.body as modelAddressCreate;
      request.contactId = contactId;
      const result = await AddressServices.Create(user, request);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const contactId = Number(req.params.contactId);
      const id = Number(req.params.addressId);
      const request: modelIdRequest = {
        contactId: contactId,
        id: id,
      };
      const result = await AddressServices.Get(user, request);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
}
