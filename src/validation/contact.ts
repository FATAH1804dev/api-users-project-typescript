import z from "zod";

export class ContactValidation {
  static readonly create = z.object({
    firstname: z.string().min(1).max(100),
    lastname: z.string().min(1).max(100).optional(),
    email: z.email().min(1).max(100).optional(),
    phone: z.string().min(1).max(20),
  });
}
