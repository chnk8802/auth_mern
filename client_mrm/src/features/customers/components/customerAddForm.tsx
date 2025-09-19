import React from "react";
import { customerFields } from "@/features/customers/config/customerFields";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import { ROUTES } from "@/constants/routes.constants";
import { useCustomerFieldStates } from "@/features/customers/hooks/useCustomerFieldState";

export interface CustomerFormProps {
  onSubmit: (data: any) => void;
}

export const CustomerAddForm = ({ onSubmit }: CustomerFormProps) => {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const fieldStates = useCustomerFieldStates(formData);

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };
  const handleSubmit = () => {
      setIsSubmitting(true);
      onSubmit?.(formData);
      setTimeout(() => setIsSubmitting(false), 300); // Simulate delay
    };
    const handleReset = () => {
    setFormData({})
    setIsSubmitting(false);
  };

  return (
    <FormBuilder
      title="Customer"
      backLink={ROUTES.CUSTOMERS.LIST}
      mode="create"
      fieldStateMap={fieldStates}
      fieldsConfig={customerFields}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onReset={handleReset}
      isSubmitting={isSubmitting}
    />
  );
};
