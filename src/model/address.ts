import type { Address } from "../../generated/prisma/client";

export type modelAddressResponse = {
  id: number;
  street?: string | null;
  city?: string | null;
  province?: string | null;
  country: string;
  postal_code: string;
};

export type modelAddressCreate = {
  street?: string;
  city?: string;
  province?: string;
  country: string;
  postal_code: string;
  contactId: number;
};

declare global {
  namespace Express {
    interface Request {
      address: Address;
    }
  }
}

export function toAddressResponse(address: Address): modelAddressResponse {
  return {
    id: address.id,
    street: address.street,
    city: address.city,
    province: address.province,
    country: address.country,
    postal_code: address.postal_code,
  };
}
