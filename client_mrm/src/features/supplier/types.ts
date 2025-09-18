import type { Address } from "@/types/api";

export interface Supplier {
  _id: string;
  supplierCode: string;
  fullName: string;
  phone?: string;
  address?: Address;
  createdAt: string;
  updatedAt: string;
}
