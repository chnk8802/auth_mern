import api from "@/lib/axios"
import type { ApiResponse } from "@/types/api";
import type { User } from "../types";

export const getUsers = async (): Promise<ApiResponse<User[]>> => {
        const res = await api.get<ApiResponse<User[]>>("users/")
        return res.data;
}

export const getUserById = async (id: string): Promise<ApiResponse<User[]>> => {
        const res = await api.get<ApiResponse<User[]>>(`users/${id}`)
        return res.data;
}

export const updateUser = async (id: string, data: User): Promise<ApiResponse<User[]>> => {
        const res = await api.put<ApiResponse<User[]>>(`users/${id}`, data)
        return res.data;
}

export const deleteUser = async (id: string): Promise<ApiResponse<User[]>> => {
        const res = await api.delete<ApiResponse<User[]>>(`users/${id}`)
        return res.data;
}