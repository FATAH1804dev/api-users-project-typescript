import z from "zod";

export class AddressValidation {
  static readonly create = z.object({
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(20),
    contactId: z.number().positive(),
  });

  static readonly update = z.object({
    id: z.number().positive(),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100).optional(),
    postal_code: z.string().min(1).max(20).optional(),
    contactId: z.number().positive(),
  });

  static readonly get = z.object({
    contactId: z.number().positive(),
    id: z.number().positive(),
  });
}
