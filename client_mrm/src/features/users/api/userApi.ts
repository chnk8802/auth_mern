import api from "@/lib/axios"
import type { ApiResponse } from "@/types/api";
import type { User } from "../types";

export const getUsers = async ({page, limit}: {page: number, limit: number}): Promise<ApiResponse<User[]>> => {
        const res = await api.get<ApiResponse<User[]>>(`users?page=${page}&limit=${limit}`)
        return res.data;
}

export const getUserById = async (id: string): Promise<ApiResponse<User[]>> => {
        const res = await api.get<ApiResponse<User[]>>(`users/${id}`)
        return res.data;
}

export const updateUser = async (id: string, data: {data: Partial<User>[]}): Promise<ApiResponse<User[]>> => {
        const res = await api.patch<ApiResponse<User[]>>(`users/${id}`, data)
        console.log(res)
        return res.data;
}

export const deleteUser = async (id: string): Promise<ApiResponse<User[]>> => {
        const res = await api.delete<ApiResponse<User[]>>(`users/${id}`)
        return res.data;
}