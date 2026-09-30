import type { Request, Response, NextFunction } from "express";
import type {
  modelCreateContact,
  modelSearchContact,
  modelUpdateContact,
} from "../model/contact.ts";
import { contactServices } from "../service/contactService.ts";

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

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const contactId = Number(req.params.contactId);
      const result = await contactServices.Remove(user, contactId);
      res.status(200).json({
        data: `contact user ${result.firstname} with id ${result.id} has been removed`,
      });
    } catch (e) {
      next(e);
    }
  }

  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const request: modelSearchContact = {
        name: req.query.name as string,
        email: req.query.email as string,
        phone: req.query.phone as string,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };
      const result = await contactServices.Search(user, request);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}
