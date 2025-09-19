import React from "react";
import { paymentFields } from "../config/paymentFields";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import { type Payment } from "../types";
import { useForm, useWatch } from "react-hook-form";
import { ROUTES } from "@/constants/routes.constants";
// import { usePaymentFieldStates } from "../hooks/usePaymentFieldStates";

export interface PaymentFormProps {
  payment: Payment;
  onSubmit: (data: any) => void;
}

export const PaymentEditForm = ({ payment, onSubmit }: PaymentFormProps) => {
  const form = useForm<Payment>({
    defaultValues: payment,
  });

  const formValues = useWatch({
    control: form.control,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // const fieldStates = usePaymentFieldStates(formValues);

  const handleChange = (fieldId: string, value: any) => {
    form.setValue(fieldId as keyof Payment, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit(form.getValues());
    setTimeout(() => setIsSubmitting(false), 300);
  };

  return (
    <FormBuilder
      title="Payment"
      backLink={ROUTES.PAYMENTS.DETAILS(payment._id)}
      mode="edit"
      // fieldStateMap={fieldStates}
      fieldsConfig={paymentFields}
      formData={formValues}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};
