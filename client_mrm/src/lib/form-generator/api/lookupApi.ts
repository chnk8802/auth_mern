import api from "@/lib/axios";
import type { ApiResponse } from "@/types/api";

export const fetchLookupData = async <T = any>(
  module: string
): Promise<ApiResponse<T[]>> => {
  const res = await api.get<ApiResponse<T[]>>(`/api/${module}`);
  return res.data;
};