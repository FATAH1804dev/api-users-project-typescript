import type { Request, Response, NextFunction } from "express";
import type { modelCreateContact } from "../model/contact";
import { contactServices } from "../service/contactService";

export class ContactController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const request: modelCreateContact = req.body as modelCreateContact;
      const result = await contactServices.Create(user, request);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
}
