import api from "@/lib/axios"
import type { User } from "@/features/users/types"

export const getUsers = async ():Promise<User> => {
        const res = await api.get("users/")
        return res
}