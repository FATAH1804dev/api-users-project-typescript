import z from "zod";

export class ContactValidation {
  static readonly create = z.object({
    firstname: z.string().min(1).max(100),
    lastname: z.string().min(1).max(100).optional(),
    email: z.email().min(1).max(100).optional(),
    phone: z.string().min(1).max(20),
  });

  static readonly update = z.object({
    id: z.number().positive(),
    firstname: z.string().min(1).max(100).optional(),
    lastname: z.string().min(1).max(100).optional(),
    email: z.email().min(1).max(100).optional(),
    phone: z.string().min(1).max(20).optional(),
  });

  static readonly search = z.object({
    name: z.string().min(1).max(100).optional(),
    email: z.string().min(1).max(100).optional(),
    phone: z.string().min(1).max(20).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
