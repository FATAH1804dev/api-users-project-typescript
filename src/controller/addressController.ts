import type { Request, Response, NextFunction } from "express";
import type { modelAddressCreate } from "../model/address";
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
}
