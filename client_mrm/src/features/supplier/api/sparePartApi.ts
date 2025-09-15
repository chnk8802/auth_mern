import api from "@/lib/axios";
import type { SparePart } from "../types";
import type { ApiResponse } from "@/types/api";

export const createSparePart = async (sparePartData: {data: Omit<SparePart, "_id">[]}): Promise<ApiResponse<SparePart[]>> => {
  const response = await api.post<ApiResponse<SparePart[]>>("/spareparts", sparePartData);
  return response.data;
};

export const getSpareParts = async ({page, limit}:{page: number, limit: number}): Promise<ApiResponse<SparePart[]>> => {
  const res = await api.get<ApiResponse<SparePart[]>>(`/spareparts?page=${page}&limit=${limit}`);
  return res.data;
};

export const getSparePartById = async (id: string): Promise<ApiResponse<SparePart[]>> => {
  const res = await api.get<ApiResponse<SparePart[]>>(`/spareparts/${id}`);
  return res.data;
};

export const updateSparePart = async (id: string, sparePartData: {data: Partial<SparePart>[]}): Promise<ApiResponse<SparePart[]>> => {
  const res = await api.patch<ApiResponse<SparePart[]>>(`/spareparts/${id}`, sparePartData);
  return res.data;
};

export const deleteSparePart = async (id: string): Promise<ApiResponse<SparePart[]>> => {
  const res = await api.delete<ApiResponse<SparePart[]>>(`/spareparts/${id}`);
  return res.data;
};