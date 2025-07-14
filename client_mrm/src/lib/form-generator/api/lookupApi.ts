import api from "@/lib/axios";
import type { ApiResponse } from "@/types/api";

export const fetchLookupData = async <T = any>(
  module: string,
  id?: string
): Promise<ApiResponse<T[]>> => {
  const url = id ? `/${module}/${id}` : `/${module}`;
  const res = await api.get<ApiResponse<T[]>>(url);
  return res.data;
};