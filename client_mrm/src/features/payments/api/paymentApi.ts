import api from "@/lib/axios";
import type { Payment } from "@/features/payments/types";
import type { ApiResponse } from "@/types/api";

export const createPayment = async (
  paymentData: { data: Omit<Payment, "_id">[] }
): Promise<ApiResponse<Payment[]>> => {
  const res = await api.post<ApiResponse<Payment[]>>("/payments", paymentData);
  return res.data;
};

export const getPayments = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<ApiResponse<Payment[]>> => {
  const res = await api.get<ApiResponse<Payment[]>>(
    `/payments?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const getPaymentById = async (
  id: string
): Promise<ApiResponse<Payment[]>> => {
  const res = await api.get<ApiResponse<Payment[]>>(`/payments/${id}`);
  return res.data;
};

export const updatePayment = async (
  id: string,
  paymentData: { data: Partial<Payment>[] }
): Promise<ApiResponse<Payment[]>> => {
  const res = await api.patch<ApiResponse<Payment[]>>(
    `/payments/${id}`,
    paymentData
  );
  return res.data;
};

export const deletePayment = async (
  id: string
): Promise<ApiResponse<Payment[]>> => {
  const res = await api.delete<ApiResponse<Payment[]>>(`/payments/${id}`);
  return res.data;
};
