"use client";

import * as React from "react";
import { ROUTES } from "@/constants/routes.constants";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import { paymentFields } from "../config/paymentFields";

type AddPaymentFormProps = {
  onSubmit: (data: any) => void;
};

export function PaymentAddForm({ onSubmit }: AddPaymentFormProps) {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // const fieldStates = usePaymentFieldStates(formData); 
  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit?.(formData);
    setTimeout(() => setIsSubmitting(false), 300);
  };

  const handleReset = () => {
    setFormData({});
    setIsSubmitting(false);
  };

  return (
    <FormBuilder
      title="Payment"
      mode="create"
      // fieldStateMap={fieldStates}
      fieldsConfig={paymentFields}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onReset={handleReset}
      isSubmitting={isSubmitting}
    />
  );
}
