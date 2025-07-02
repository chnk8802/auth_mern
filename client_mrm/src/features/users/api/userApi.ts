import api from "@/lib/axios"
import type { ApiResponse } from "@/types/api";
import type { User } from "../types";

export const getUsers = async (): Promise<ApiResponse<User[]>> => {
        const res = await api.get<ApiResponse<User[]>>("users/")
        return res.data;
}

export const getUser = async (id: string): Promise<ApiResponse<User[]>> => {
        const res = await api.get<ApiResponse<User[]>>(`users/${id}`)
        return res.data;
}