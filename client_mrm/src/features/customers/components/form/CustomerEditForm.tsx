import React from "react";
import { fields } from "@/features/customers/components/form/customerFields";
import { customerWorkflow } from "@/features/customers/workflows/workflow";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import type { AuthUser } from "@/features/auth/types";
import { ROUTES } from "@/constants/routes";

export interface CustomerFormProps {
  currentUser: AuthUser;
  onSubmit: (data: any) => void;
}

export const CustomerEditForm = ({
  currentUser,
  onSubmit,
}: CustomerFormProps) => {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit?.(formData);
    setTimeout(() => setIsSubmitting(false), 300);
  };

  return (
    <FormBuilder
      title="Customer"
      backLink={ROUTES.CUSTOMERS.DETAILS(customer._id)}
      mode="edit"
      fields={fields}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      workflow={customerWorkflow}
      context={{ currentUser }}
    />
  );
};
