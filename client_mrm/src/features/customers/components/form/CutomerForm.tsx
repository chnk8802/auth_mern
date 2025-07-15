import React from "react";
import { customerFields } from "@/features/customers/components/form/customerFields";
import { customerWorkflow } from "../../workflows/workflow";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import type { AuthUser } from "@/features/auth/types";
import { ROUTES } from "@/constants/routes";

export interface CustomerFormProps {
  currentUser: AuthUser;
  onSubmit: (data: any) => void;
}

export const CustomerForm = ({ currentUser, onSubmit }: CustomerFormProps) => {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  

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
      fields={customerFields}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onReset={handleReset}
      isSubmitting={isSubmitting}
      workflow={customerWorkflow}
      context={{ currentUser }}
    />
  );
};
