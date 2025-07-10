import api from "@/lib/axios";
import type { RepairJob } from "@/features/repairJob/types";
import type { ApiResponse } from "@/types/api";

export const createRepairJob = async (repairjobData: {data: Omit<RepairJob, "_id">[]}): Promise<ApiResponse<RepairJob[]>> => {
  const response = await api.post<ApiResponse<RepairJob[]>>("/repairjobs", repairjobData);
  return response.data;
};

export const getRepairJobs = async ({page, limit}:{page: number, limit: number}): Promise<ApiResponse<RepairJob[]>> => {
  const res = await api.get<ApiResponse<RepairJob[]>>(`/repairjobs?page=${page}&limit=${limit}`);
  return res.data;
};

export const getRepairjobById = async (id: string): Promise<ApiResponse<RepairJob[]>> => {
  const res = await api.get<ApiResponse<RepairJob[]>>(`/repairjobs/${id}`);
  return res.data;
};

export const updateRepairJob = async (id: string, repairjobData: {data: Partial<RepairJob>[]}): Promise<ApiResponse<RepairJob[]>> => {
  const res = await api.patch<ApiResponse<RepairJob[]>>(`/repairjobs/${id}`, repairjobData);
  return res.data;
};

export const deleteRepairJob = async (id: string): Promise<ApiResponse<RepairJob[]>> => {
  const res = await api.delete<ApiResponse<RepairJob[]>>(`/repairjobs/${id}`);
  return res.data;
};