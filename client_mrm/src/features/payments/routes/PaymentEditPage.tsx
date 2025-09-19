import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { type Payment } from "../types";
import { getPaymentById, updatePayment } from "../api/paymentApi";
import { getChangedFields } from "@/lib/utils";
import { ROUTES } from "@/constants/routes.constants";
import { PaymentEditForm } from "../components/PaymentEditForm";
import { Loading } from "@/components/common/Loading";

export function PaymentEditPage() {
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

  const handleEdit = (data: Payment) => {
    if (!paymentId || !payment) {
      toast.error("Payment ID or original data is missing");
      return;
    }

    const changedFields = getChangedFields(data, payment);
    if (Object.keys(changedFields).length === 0) {
      toast.info("No changes detected");
      return;
    }

    const payload = { data: [{ ...changedFields }] };

    const submitUpdate = async () => {
      try {
        const result = await updatePayment(paymentId, payload);
        toast.success("Payment details updated");
        navigate(ROUTES.PAYMENTS.DETAILS(result.data[0]._id));
      } catch (error: any) {
        toast.error(
          `Unable to update payment: ${
            error.response?.data?.message || "Unknown error"
          }`
        );
      }
    };

    submitUpdate();
  };

  if (loading) return <Loading fullscreen={true} />;
  if (!payment)
    return <div className="p-2 text-center">Payment not found</div>;

  return (
    <PaymentEditForm payment={payment} onSubmit={handleEdit} />
  );
}
