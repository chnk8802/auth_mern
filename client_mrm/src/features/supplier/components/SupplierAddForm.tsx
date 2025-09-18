import React from "react";
import { supplierConfig } from "../config/supplierConfig";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import { ROUTES } from "@/constants/routes";
// import { useSupplierFieldStates } from "../hooks/useSupplierFieldState";

export interface SupplierFormProps {
  onSubmit: (data: any) => void;
}

export const SupplierAddForm = ({ onSubmit }: SupplierFormProps) => {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // const fieldStates = useSupplierFieldStates(formData);

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit?.(formData);
    setTimeout(() => setIsSubmitting(false), 300); // Simulate delay
  };

  const handleReset = () => {
    setFormData({});
    setIsSubmitting(false);
  };

  return (
    <FormBuilder
      title="Supplier"
      backLink={ROUTES.SUPPLIERS.LIST}
      mode="create"
      // fieldStateMap={fieldStates}
      fieldsConfig={supplierConfig}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onReset={handleReset}
      isSubmitting={isSubmitting}
    />
  );
};
