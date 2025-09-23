"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { type Payment } from "../types";
import { ROUTES } from "@/constants/routes.constants";
import { deletePayment, getPaymentById } from "../api/paymentApi";
import { paymentFields } from "../config/paymentFields";
import { DetailsPageHeader } from "@/components/headers/DetailsHeader";
import { DetailsBuilder } from "@/lib/form-generator/components/DetailView/DetailBuilder";
import { Loading } from "@/components/common/Loading";

export function PaymentDetailPage() {
  const navigate = useNavigate();
  const { paymentId } = useParams();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!paymentId) return;

    const fetchPayment = async () => {
      try {
        const res = await getPaymentById(paymentId);
        setPayment(res.data[0]);
      } catch (err) {
        toast.error("Failed to fetch payment");
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [paymentId]);

  const handleDelete = async () => {
    if (!payment?._id) return;

    try {
      const result = await deletePayment(payment._id);

      toast.success(`${result.data[0].paymentCode} deleted successfully`);
      navigate(ROUTES.PAYMENTS.LIST);
    } catch (err) {
      toast.error("Failed to delete payment");
    }
  };

  const handleEdit = async () => {
    if (!payment?._id) return;
    navigate(ROUTES.PAYMENTS.EDIT(payment._id));
  };

  if (loading) return <Loading fullscreen={true} />;
  if (!payment)
    return (
      <div className="p-6 text-start">
        <DetailsPageHeader title="Payment Details" />
        Payment not found.
      </div>
    );

  return (
    <DetailsBuilder
      title="Payment Details"
      fieldConfig={paymentFields}
      data={payment}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );
}
