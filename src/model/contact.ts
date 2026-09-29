import type { Contact } from "../../generated/prisma/client";

export type modelResponseContact = {
  id: number;
  firstname: string;
  lastname?: string | null;
  email?: string | null;
  phone: string;
};

export type modelCreateContact = {
  firstname: string;
  lastname?: string;
  email?: string;
  phone: string;
};

export type modelUpdateContact = {
  id: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
};

declare global {
  namespace Express {
    interface Request {
      contact: Contact;
    }
  }
}

export function toContactResponse(contact: Contact): modelResponseContact {
  return {
    id: contact.id,
    firstname: contact.firstname,
    lastname: contact.lastname,
    email: contact.email,
    phone: contact.phone,
  };
}
