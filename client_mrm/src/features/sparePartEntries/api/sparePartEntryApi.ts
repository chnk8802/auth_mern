import api from "@/lib/axios";
import type { SparePartEntry } from "@/features/sparePartEntries/types";
import type { ApiResponse } from "@/types/api";

export const createSparePartEntry = async (
  entryData: { data: Omit<SparePartEntry, "_id">[] }
): Promise<ApiResponse<SparePartEntry[]>> => {
  const response = await api.post<ApiResponse<SparePartEntry[]>>(
    "/sparepartentries",
    entryData
  );
  return response.data;
};

export const getSparePartEntries = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<ApiResponse<SparePartEntry[]>> => {
  const res = await api.get<ApiResponse<SparePartEntry[]>>(
    `/sparepartentries?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const getSparePartEntryById = async (
  id: string
): Promise<ApiResponse<SparePartEntry[]>> => {
  const res = await api.get<ApiResponse<SparePartEntry[]>>(
    `/sparepartentries/${id}`
  );
  return res.data;
};

export const updateSparePartEntry = async (
  id: string,
  entryData: { data: Partial<SparePartEntry>[] }
): Promise<ApiResponse<SparePartEntry[]>> => {
  const res = await api.patch<ApiResponse<SparePartEntry[]>>(
    `/sparepartentries/${id}`,
    entryData
  );
  return res.data;
};

export const deleteSparePartEntry = async (
  id: string
): Promise<ApiResponse<SparePartEntry[]>> => {
  const res = await api.delete<ApiResponse<SparePartEntry[]>>(
    `/sparepartentries/${id}`
  );
  return res.data;
};
