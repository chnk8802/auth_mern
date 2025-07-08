import api from "@/lib/axios";
import type { Customer } from "@/features/customers/types";
import type { ApiResponse } from "@/types/api";

export const createCustomer = async (customerData: {data: Omit<Customer, "_id">[]}): Promise<ApiResponse<Customer[]>> => {
  const response = await api.post<ApiResponse<Customer[]>>("/customers", customerData);
  return response.data;
};

export const getCustomers = async (): Promise<ApiResponse<Customer[]>> => {
  const res = await api.get<ApiResponse<Customer[]>>("/customers");
  return res.data;
};

export const getCustomerById = async (id: string): Promise<ApiResponse<Customer[]>> => {
  const res = await api.get<ApiResponse<Customer[]>>(`/customers/${id}`);
  return res.data;
};

export const updateCustomer = async (id: string, customerData: {data: Partial<Customer>[]}): Promise<ApiResponse<Customer[]>> => {
  const res = await api.patch<ApiResponse<Customer[]>>(`/customers/${id}`, customerData);
  return res.data;
};

export const deleteCustomer = async (id: string): Promise<ApiResponse<Customer[]>> => {
  const res = await api.delete<ApiResponse<Customer[]>>(`/customers/${id}`);
  return res.data;
};