import type { Address } from "@/types/api"
export interface User {
    _id: string,
    userCode: string,
    fullName?:string,
    email: string,
    role: string,
    address: Address,
    createdAt: string,
    updatedAt: string
}