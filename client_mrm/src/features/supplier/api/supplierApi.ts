import api from "@/lib/axios";
import type { Supplier } from "../types";
import type { ApiResponse } from "@/types/api";

export const createSupplier = async (
  supplierData: { data: Omit<Supplier, "_id">[] }
): Promise<ApiResponse<Supplier[]>> => {
  const response = await api.post<ApiResponse<Supplier[]>>("/suppliers", supplierData);
  return response.data;
};

export const getSuppliers = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<ApiResponse<Supplier[]>> => {
  const res = await api.get<ApiResponse<Supplier[]>>(`/suppliers?page=${page}&limit=${limit}`);
  return res.data;
};

export const getSupplierById = async (id: string): Promise<ApiResponse<Supplier>> => {
  const res = await api.get<ApiResponse<Supplier>>(`/suppliers/${id}`);
  return res.data;
};

export const updateSupplier = async (
  id: string,
  supplierData: { data: Partial<Supplier>[] }
): Promise<ApiResponse<Supplier>> => {
  const res = await api.patch<ApiResponse<Supplier>>(`/suppliers/${id}`, supplierData);
  return res.data;
};

export const deleteSupplier = async (id: string): Promise<ApiResponse<null>> => {
  const res = await api.delete<ApiResponse<null>>(`/suppliers/${id}`);
  return res.data;
};
