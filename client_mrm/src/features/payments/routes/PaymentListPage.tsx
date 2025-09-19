"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-Table";
import {
  getPayments,
  deletePayment,
} from "@/features/payments/api/paymentApi";
import type { Payment } from "@/features/payments/types";
import { useNavigate } from "react-router-dom";
import { ColumnGenerator } from "@/lib/form-generator/components/ListView/ColumnGenerator";
import { paymentFields } from "../config/paymentFields";

export function PaymentListPage() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchPayments = async () => {
    try {
      const res = await getPayments({ page, limit });
      if (res.data.length === 0) {
        setPayments([]);
        return;
      }
      setTotal(res.meta.pagination.total);
      setPayments(res.data);
    } catch (error: any) {
      toast.error("Failed to fetch payments");
    }
  };

  const handleRowEdit = (payment: Payment) => {
    navigate(`/dashboard/payments/${payment._id}/edit`);
  };

  const handleRowDelete = async (payment: Payment) => {
    try {
      const result = await deletePayment(payment._id);
      if (result.data.length === 0) {
        toast.error("Payment not found");
        return;
      }
      toast.success(`${result.data[0].paymentCode} Payment deleted`);
      fetchPayments();
    } catch (err) {
      toast.error("Failed to delete payment");
    }
  };

  const columns = ColumnGenerator<Payment>({
    fieldConfig: paymentFields,
    onEdit: handleRowEdit,
    onDelete: handleRowDelete,
    copyField: "paymentCode", // unique identifier for copy
  });

  useEffect(() => {
    fetchPayments();
  }, [page, limit]);

  return (
    <DataTable
      columns={columns}
      data={payments}
      moduleName={"Payment"}
      page={page}
      setPage={setPage}
      limit={limit}
      setLimit={setLimit}
      total={total}
    />
  );
}
