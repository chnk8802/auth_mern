import type { Address } from "@/types/api"
export interface Customer {
    _id: string,
    displayName?: string,
    customerCode: string,
    fullName?: string,
    phone?: string,
    isBulkCustomer: boolean,
    address: Address,
    createdAt: string,
    updatedAt: string
}