import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes.constants";
import type { Payment } from "../types";
import { createPayment } from "../api/paymentApi";
import { PaymentAddForm } from "../components/PaymentAddForm";

export function PaymentAddPage() {
  const navigate = useNavigate();

  const handleAdd = (paymentData: Omit<Payment, "_id">) => {
    const payload = { data: [paymentData] };

    const submitAdd = async () => {
      try {
        const result = await createPayment(payload);
        toast.success("Payment added successfully");
        navigate(ROUTES.PAYMENTS.DETAILS(result.data[0]._id));
      } catch (error: any) {
        toast.error(
          `Unable to add payment: ${error?.response?.data?.message || "Unknown error"}`
        );
      }
    };

    submitAdd();
  };

  return <PaymentAddForm onSubmit={handleAdd} />;
}
