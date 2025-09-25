import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import React from "react";
import { sparePartEntryFields } from "../config/sparePartEntryFields";
import { useSparePartEntryFieldStates } from "../hooks/useSparePartEntryFieldState";
export interface SparePartEntryFormProps {
  onSubmit: (data: any) => void;
}

export const SparePartEntryAddForm = ({ onSubmit }: SparePartEntryFormProps) => {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit?.(formData);
    setTimeout(() => setIsSubmitting(false), 300); // simulate delay
  };

  return (
    <FormBuilder
      title="Spare Part Entry"
      mode="create"
      fieldsConfig={sparePartEntryFields}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};
