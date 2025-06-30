export interface Result {
    data: [],
    message: string,
    meta: 
}
interface Address {
    street: string,
    city: string,
    state: string,
    country: string,
    zip: string
}
export interface User {
    _id: string,
    userCode: string,
    fullName:string,
    email: string,
    role: string,
    address: Address,
    createdAt: string,
    updatedAt: string
}