import type { Request, Response, NextFunction } from "express";
import type { modelCreateContact, modelUpdateContact } from "../model/contact";
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

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const contactId = Number(req.params.contactId);
      const result = await contactServices.Get(user, contactId);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const contactId = Number(req.params.contactId);
      const request: modelUpdateContact = req.body as modelUpdateContact;
      request.id = contactId;
      const result = await contactServices.Update(user, request);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
}
