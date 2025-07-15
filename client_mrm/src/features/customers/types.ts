import type { Address } from "@/types/api"
export interface Customer {
    _id: string,
    displayName?: string,
    customerType: string,
    customerCode: string,
    fullName?: string,
    phone?: string,
    address: Address,
    createdAt: string,
    updatedAt: string
}