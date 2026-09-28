import { z, ZodType } from "zod";

export class UserValidation {
  static readonly register = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
    name: z.string().min(1).max(100),
  });

  static readonly login = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
  });

  static readonly update = z.object({
    password: z.string().min(1).max(100).optional(),
    name: z.string().min(1).max(100).optional(),
  });
}
